import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
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

// ✅ GET: Load document by id (Next.js 15 compatible)
export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await context.params;
        const document = await prisma.document.findUnique({ where: { id } });

        if (!document) return NextResponse.json({ error: 'Document not found' }, { status: 404 });

        return NextResponse.json(document);
    } catch (error) {
        console.error('Error fetching document:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// ✅ PUT: Update document (Next.js 15 compatible)
export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await context.params;

        const formData = await req.formData();

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
        let fileUrl = existingFileUrl || '';

        if (file) {
            fileUrl = await uploadToCloudinary(file);
        }

        const document = await prisma.document.findUnique({ where: { id } });
        if (!document) return NextResponse.json({ error: 'Document not found' }, { status: 404 });

        // Update document
        const updatedDocument = await prisma.document.update({
            where: { id },
            data: {
                title: title || document.title,
                type: type || document.type,
                number: number || document.number,
                date: date || document.date,
                field: field || document.field,
                summary: summary || document.summary,
                fileType: fileType || document.fileType,
                isNew: isNew !== undefined ? isNew : document.isNew,
                fileUrl: fileUrl || document.fileUrl,
            },
        });

        return NextResponse.json(updatedDocument);
    } catch (error) {
        console.error('Error updating document:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// ✅ DELETE: Remove document (Next.js 15 compatible)
export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await context.params;

        const document = await prisma.document.findUnique({ where: { id } });
        if (!document) return NextResponse.json({ error: 'Document not found' }, { status: 404 });

        // Delete file from Cloudinary
        if (document.fileUrl) {
            const publicId = document.fileUrl.split('/').pop()?.split('.')[0];
            if (publicId) {
                await cloudinary.uploader.destroy(publicId);
            }
        }

        await prisma.document.delete({ where: { id } });

        return NextResponse.json({ message: 'Document deleted' });
    } catch (error) {
        console.error('Error deleting document:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
