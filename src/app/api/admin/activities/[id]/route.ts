import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Activity from '@/models/Activity';
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
        await dbConnect();
        const { id } = await context.params; // 👈 cần await ở đây
        const activity = await Activity.findById(id).lean();

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
    await dbConnect();
    const { id } = await context.params; // 👈 cần await

    const formData = await req.formData();
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const category = formData.get('category') as string;
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

    const activity = await Activity.findById(id);
    if (!activity) return NextResponse.json({ error: 'Activity not found' }, { status: 404 });

    activity.title = title || activity.title;
    activity.description = description || activity.description;
    activity.category = category || activity.category;
    activity.date = date || activity.date;
    activity.author = author || activity.author;
    activity.videos = videos.length ? videos : activity.videos;

    if (newImageUrls.length) {
        activity.images = [...activity.images, ...newImageUrls];
        activity.thumbnail = newImageUrls[0] || activity.thumbnail;
    }

    await activity.save();

    return NextResponse.json(activity);
}

export async function DELETE(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }, // 👈 tương tự
) {
    await dbConnect();
    const { id } = await context.params;

    const activity = await Activity.findByIdAndDelete(id);
    if (!activity) return NextResponse.json({ error: 'Activity not found' }, { status: 404 });

    for (const url of [...activity.images, activity.thumbnail]) {
        if (url) {
            const publicId = url.split('/').pop()?.split('.')[0];
            await cloudinary.uploader.destroy(publicId);
        }
    }

    return NextResponse.json({ message: 'Activity deleted' });
}
