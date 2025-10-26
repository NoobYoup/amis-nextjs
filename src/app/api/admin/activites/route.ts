import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Activity from '@/models/Activity';
import cloudinary from '@/lib/cloudinary';
import type { UploadApiResponse } from 'cloudinary';
import type { FilterQuery } from 'mongoose';

// Define proper types for the query
type ActivityQuery = FilterQuery<{
    title: string;
    description: string;
    category: string;
    date: Date;
    author: string;
    thumbnail: string;
    images: string[];
    videos: string[];
}>;

// Helper upload images
async function uploadImages(files: File[]): Promise<string[]> {
    const urls: string[] = [];
    for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const result = await new Promise<UploadApiResponse>((resolve, reject) => {
            cloudinary.uploader
                .upload_stream({ resource_type: 'image' }, (error, res) => {
                    if (error) reject(error);
                    else if (res) resolve(res);
                    else reject(new Error('Upload failed: No response received'));
                })
                .end(buffer);
        });
        urls.push(result.secure_url);
    }
    return urls;
}

export async function GET(req: NextRequest) {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = 10;

    const query: ActivityQuery = {};
    if (search)
        query.$or = [{ title: { $regex: search, $options: 'i' } }, { author: { $regex: search, $options: 'i' } }];
    if (category) query.category = category;

    const activities = await Activity.find(query)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean();
    const total = await Activity.countDocuments(query);

    return NextResponse.json({ data: activities, pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
}

export async function POST(req: NextRequest) {
    await dbConnect();
    const formData = await req.formData();
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    // ... get other fields
    const images = formData.getAll('images') as File[]; // Multiple files
    const videos = formData.get('videos')?.toString().split('\n').filter(Boolean) || [];

    const imageUrls = await uploadImages(images);
    const thumbnail = imageUrls[0] || ''; // First as thumbnail

    const activity = new Activity({
        title,
        description,
        category: formData.get('category'),
        date: new Date(formData.get('date')!.toString()),
        author: formData.get('author'),
        thumbnail,
        images: imageUrls,
        videos,
    });
    await activity.save();

    return NextResponse.json(activity, { status: 201 });
}
