import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import cloudinary from '@/lib/cloudinary';

// Upload helper
async function uploadToCloudinary(file: File, resourceType: 'image' | 'video' = 'image'): Promise<string> {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream({ resource_type: resourceType }, (error, result) => {
            if (error) reject(error);
            else resolve(result?.secure_url || '');
        });
        uploadStream.end(buffer);
    });
}

// ✅ FIXED GET: compatible with Next.js 15
export async function GET(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }, // 👈 nhận Promise thay vì object trực tiếp
) {
    try {
        const { id } = await context.params;
        const activity = await prisma.activity.findUnique({
            where: { id },
            include: { category: true },
        });

        if (!activity) {
            return NextResponse.json({ error: 'Activity not found' }, { status: 404 });
        }

        return NextResponse.json(activity);
    } catch (error) {
        console.error('Error fetching activity:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function PUT(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }, // 👈 thêm Promise ở đây
) {
    const { id } = await context.params;

    const formData = await req.formData();
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const categoryId = formData.get('category') as string;
    const date = new Date(formData.get('date') as string);
    const author = formData.get('author') as string;
    const videosStr = (formData.get('videos') as string) || '';
    const videos = videosStr.split('\n').filter(Boolean);

    const imagesFiles = formData.getAll('images') as File[];
    const newImageUrls: string[] = [];

    for (const file of imagesFiles) {
        if (file) {
            const url = await uploadToCloudinary(file);
            newImageUrls.push(url);
        }
    }

    const activity = await prisma.activity.findUnique({ where: { id } });
    if (!activity) return NextResponse.json({ error: 'Activity not found' }, { status: 404 });

    const existingImages = (activity.images as string[]) || [];
    const updatedImages = newImageUrls.length ? [...existingImages, ...newImageUrls] : existingImages;
    const updatedThumbnail = newImageUrls[0] || activity.thumbnail;

    const updatedActivity = await prisma.activity.update({
        where: { id },
        data: {
            title: title || activity.title,
            description: description || activity.description,
            categoryId: categoryId || activity.categoryId,
            date: date || activity.date,
            author: author || activity.author,
            videos: videos.length ? videos : (activity.videos as string[]) || [],
            images: updatedImages,
            thumbnail: updatedThumbnail,
        },
        include: { category: true },
    });

    return NextResponse.json(updatedActivity);
}

export async function DELETE(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }, // 👈 tương tự
) {
    const { id } = await context.params;

    const activity = await prisma.activity.findUnique({ where: { id } });
    if (!activity) return NextResponse.json({ error: 'Activity not found' }, { status: 404 });

    // Delete from Cloudinary
    const images = (activity.images as string[]) || [];
    for (const url of [...images, activity.thumbnail].filter(Boolean) as string[]) {
        const publicId = url.split('/').pop()?.split('.')[0];
        if (publicId) {
            await cloudinary.uploader.destroy(publicId);
        }
    }

    await prisma.activity.delete({ where: { id } });

    return NextResponse.json({ message: 'Activity deleted' });
}
