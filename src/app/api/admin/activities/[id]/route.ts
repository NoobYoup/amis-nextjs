import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Activity from '@/models/Activity';
import cloudinary from '@/lib/cloudinary';

// Reuse upload helper from above (copy if needed)
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

// GET: Load single activity by id
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        await dbConnect();
        const { id } = params;
        const activity = await Activity.findById(id).lean(); // .lean() để JSON plain object

        if (!activity) {
            return NextResponse.json({ error: 'Activity not found' }, { status: 404 });
        }

        return NextResponse.json(activity);
    } catch (error) {
        console.error('Error fetching activity:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    await dbConnect();
    const { id } = params;
    const formData = await req.formData();

    // Parse fields (similar to POST)
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const category = formData.get('category') as string;
    const date = new Date(formData.get('date') as string);
    const author = formData.get('author') as string;
    const videosStr = (formData.get('videos') as string) || '';
    const videos = videosStr.split('\n').filter(Boolean);

    // Upload new images if any
    const imagesFiles = formData.getAll('images') as File[];
    const newImageUrls: string[] = [];
    for (const file of imagesFiles) {
        if (file) {
            const url = await uploadToCloudinary(file);
            newImageUrls.push(url);
        }
    }

    // Find existing activity
    const activity = await Activity.findById(id);
    if (!activity) return NextResponse.json({ error: 'Activity not found' }, { status: 404 });

    // Update fields
    activity.title = title || activity.title;
    activity.description = description || activity.description;
    activity.category = category || activity.category;
    activity.date = date || activity.date;
    activity.author = author || activity.author;
    activity.videos = videos.length ? videos : activity.videos;

    // Append new images, update thumbnail if new
    if (newImageUrls.length) {
        activity.images = [...activity.images, ...newImageUrls];
        activity.thumbnail = newImageUrls[0] || activity.thumbnail;
    }

    await activity.save();

    return NextResponse.json(activity);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    await dbConnect();
    const { id } = params;

    const activity = await Activity.findByIdAndDelete(id);
    if (!activity) return NextResponse.json({ error: 'Activity not found' }, { status: 404 });

    // Optional: Delete images from Cloudinary (nếu cần, parse public_id từ URL)
    for (const url of [...activity.images, activity.thumbnail]) {
        if (url) {
            const publicId = url.split('/').pop()?.split('.')[0]; // Extract public_id
            await cloudinary.uploader.destroy(publicId);
        }
    }

    return NextResponse.json({ message: 'Activity deleted' });
}
