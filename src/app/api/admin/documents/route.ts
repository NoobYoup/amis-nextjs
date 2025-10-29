import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Document from '@/models/Document';
import cloudinary from '@/lib/cloudinary';

// Helper: Upload file to Cloudinary (raw for PDF/DOC)
async function uploadToCloudinary(file: File): Promise<string> {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            { resource_type: 'raw', format: file.name.split('.').pop() }, // e.g., pdf
            (error, result) => {
                if (error) reject(error);
                else resolve(result?.secure_url || '');
            },
        );
        uploadStream.end(buffer);
    });
}

export async function GET(req: NextRequest) {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search') || '';
    const type = searchParams.get('type') || '';
    const field = searchParams.get('field') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = 10;

    interface DocumentQuery {
        $or?: Array<{
            title?: { $regex: string; $options: string };
            number?: { $regex: string; $options: string };
        }>;
        type?: string;
        field?: string;
    }
    
    const query: DocumentQuery = {};
    if (search)
        query.$or = [{ title: { $regex: search, $options: 'i' } }, { number: { $regex: search, $options: 'i' } }];
    if (type) query.type = type;
    if (field) query.field = field;

    const documents = await Document.find(query)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);

    const total = await Document.countDocuments(query);

    return NextResponse.json({ data: documents, total, page, pages: Math.ceil(total / limit) });
}

export async function POST(req: NextRequest) {
    await dbConnect();
    const formData = await req.formData();

    const title = formData.get('title') as string;
    const type = formData.get('type') as string;
    const number = formData.get('number') as string;
    const date = new Date(formData.get('date') as string);
    const field = formData.get('field') as string;
    const summary = formData.get('summary') as string;
    const fileType = (formData.get('fileType') as string) || 'pdf';
    const isNew = formData.get('isNew') === 'true';

    // Upload file
    const file = formData.get('file') as File;
    if (!file) return NextResponse.json({ error: 'Missing file' }, { status: 400 });
    const fileUrl = await uploadToCloudinary(file);

    // Validation
    if (!title || !type || !number || !date || !field || !fileUrl) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const document = new Document({ title, type, number, date, field, summary, fileUrl, fileType, isNew });
    await document.save();

    return NextResponse.json(document, { status: 201 });
}

export async function DELETE(req: NextRequest) {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) return NextResponse.json({ error: 'Missing document ID' }, { status: 400 });

    const document = await Document.findByIdAndDelete(id);
    if (!document) return NextResponse.json({ error: 'Document not found' }, { status: 404 });

    // Optional: Delete file from Cloudinary
    if (document.fileUrl) {
        const publicId = document.fileUrl.split('/').pop()?.split('.')[0];
        await cloudinary.uploader.destroy(publicId);
    }

    return NextResponse.json({ message: 'Document deleted' });
}
