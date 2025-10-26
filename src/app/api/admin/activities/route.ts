import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Activity from '@/models/Activity';
import cloudinary from '@/lib/cloudinary';

// Helper: Upload files to Cloudinary
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

export async function GET(req: NextRequest) {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = 10;

    const query: any = {};
    if (search)
        query.$or = [{ title: { $regex: search, $options: 'i' } }, { author: { $regex: search, $options: 'i' } }];
    if (category) query.category = category;

    const activities = await Activity.find(query)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);

    const total = await Activity.countDocuments(query);

    return NextResponse.json({ data: activities, total, page, pages: Math.ceil(total / limit) });
}

export async function POST(req: NextRequest) {
    await dbConnect();
    const formData = await req.formData();

    // Parse fields
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const category = formData.get('category') as string;
    const date = new Date(formData.get('date') as string);
    const author = formData.get('author') as string;
    const videosStr = (formData.get('videos') as string) || ''; // Multiline string
    const videos = videosStr.split('\n').filter(Boolean); // Array embeds

    // Upload images
    const imagesFiles = formData.getAll('images') as File[];
    const imageUrls: string[] = [];
    for (const file of imagesFiles) {
        if (file) {
            const url = await uploadToCloudinary(file);
            imageUrls.push(url);
        }
    }
    const thumbnail = imageUrls[0] || ''; // First image as thumbnail

    // Validation cơ bản (bạn có thể add Zod sau)
    if (!title || !description || !category || !date || !author) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const activity = new Activity({ title, description, category, date, author, thumbnail, images: imageUrls, videos });
    await activity.save();

    return NextResponse.json(activity, { status: 201 });
}
