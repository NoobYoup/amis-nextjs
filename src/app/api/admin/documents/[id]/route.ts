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

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        await dbConnect();
        const { id } = params;
        const document = await Document.findById(id).lean();

        if (!document) return NextResponse.json({ error: 'Document not found' }, { status: 404 });

        return NextResponse.json(document);
    } catch (error) {
        console.error('Error fetching document:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        await dbConnect();
        const { id } = params;
        const formData = await req.formData();

        // Parse fields (similar to POST)
        const title = formData.get('title') as string;
        const type = formData.get('type') as string;
        const number = formData.get('number') as string;
        const date = new Date(formData.get('date') as string);
        const field = formData.get('field') as string;
        const summary = formData.get('summary') as string;
        const fileType = (formData.get('fileType') as string) || 'pdf';
        const isNew = formData.get('isNew') === 'true';
        const existingFileUrl = formData.get('existingFileUrl') as string;

        // Upload new file if provided
        const file = formData.get('file') as File;
        let fileUrl = existingFileUrl || ''; // Keep existing file URL if no new file

        if (file) {
            fileUrl = await uploadToCloudinary(file);
        }

        const document = await Document.findById(id);
        if (!document) return NextResponse.json({ error: 'Document not found' }, { status: 404 });

        // Update fields
        document.title = title || document.title;
        document.type = type || document.type;
        document.number = number || document.number;
        document.date = date || document.date;
        document.field = field || document.field;
        document.summary = summary || document.summary;
        document.fileType = fileType || document.fileType;
        document.isNew = isNew !== undefined ? isNew : document.isNew;

        if (fileUrl) document.fileUrl = fileUrl;

        await document.save();

        return NextResponse.json(document);
    } catch (error) {
        console.error('Error updating document:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        await dbConnect();
        const { id } = params;

        const document = await Document.findByIdAndDelete(id);
        if (!document) return NextResponse.json({ error: 'Document not found' }, { status: 404 });

        // Optional: Delete file from Cloudinary
        if (document.fileUrl) {
            const publicId = document.fileUrl.split('/').pop()?.split('.')[0];
            await cloudinary.uploader.destroy(publicId);
        }

        return NextResponse.json({ message: 'Document deleted' });
    } catch (error) {
        console.error('Error deleting document:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
