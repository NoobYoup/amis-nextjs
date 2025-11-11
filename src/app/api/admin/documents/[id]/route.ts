import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import cloudinary from '@/lib/cloudinary';

// Helper: Upload file to Cloudinary (raw for PDF/DOC)
async function uploadToCloudinary(file: File): Promise<string> {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Lấy tên file không có extension
    const fileName = file.name.replace(/\.[^/.]+$/, '');
    
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            { 
                resource_type: 'raw',
                public_id: `documents/${fileName}`, // Đặt tên file
                use_filename: true,
                unique_filename: true,
            },
            (error, result) => {
                if (error) {
                    console.error('Cloudinary upload error:', error);
                    reject(error);
                } else {
                    // Đảm bảo URL có đúng extension
                    const url = result?.secure_url || '';
                    console.log('Uploaded file URL:', url);
                    resolve(url);
                }
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

        const document = await prisma.document.findUnique({ where: { id } });
        if (!document) return NextResponse.json({ error: 'Document not found' }, { status: 404 });

        // Upload new file if provided
        const file = formData.get('file') as File;
        let fileUrl = existingFileUrl || document.fileUrl;

        if (file) {
            // Upload new file
            fileUrl = await uploadToCloudinary(file);
            
            // Delete old file from Cloudinary if exists and is different
            if (document.fileUrl && document.fileUrl !== fileUrl) {
                try {
                    const urlParts = document.fileUrl.split('/upload/');
                    if (urlParts.length > 1) {
                        const pathWithVersion = urlParts[1];
                        const publicIdWithExt = pathWithVersion.split('/').slice(1).join('/');
                        const publicId = publicIdWithExt.replace(/\.[^/.]+$/, '');
                        
                        await cloudinary.uploader.destroy(publicId, { resource_type: 'raw' });
                        console.log('Deleted old file from Cloudinary:', publicId);
                    }
                } catch (error) {
                    console.error('Error deleting old file from Cloudinary:', error);
                }
            }
        }

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
            try {
                // Extract public_id from URL
                // URL format: https://res.cloudinary.com/.../raw/upload/v123/documents/filename.pdf
                const urlParts = document.fileUrl.split('/upload/');
                if (urlParts.length > 1) {
                    const pathWithVersion = urlParts[1]; // v123/documents/filename.pdf
                    const publicIdWithExt = pathWithVersion.split('/').slice(1).join('/'); // documents/filename.pdf
                    const publicId = publicIdWithExt.replace(/\.[^/.]+$/, ''); // documents/filename
                    
                    await cloudinary.uploader.destroy(publicId, { resource_type: 'raw' });
                    console.log('Deleted file from Cloudinary:', publicId);
                }
            } catch (error) {
                console.error('Error deleting file from Cloudinary:', error);
                // Continue with database deletion even if Cloudinary deletion fails
            }
        }

        await prisma.document.delete({ where: { id } });

        return NextResponse.json({ message: 'Document deleted' });
    } catch (error) {
        console.error('Error deleting document:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
