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

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search') || '';
    const type = searchParams.get('type') || '';
    const field = searchParams.get('field') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = 10;

    const where: Record<string, unknown> = {};
    
    if (search) {
        where.OR = [
            { title: { contains: search, mode: 'insensitive' } },
            { number: { contains: search, mode: 'insensitive' } },
        ];
    }
    if (type) where.type = type;
    if (field) where.field = field;

    const [documents, total] = await Promise.all([
        prisma.document.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            skip: (page - 1) * limit,
            take: limit,
        }),
        prisma.document.count({ where }),
    ]);

    return NextResponse.json({ data: documents, total, page, pages: Math.ceil(total / limit) });
}

export async function POST(req: NextRequest) {
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

    const document = await prisma.document.create({
        data: { title, type, number, date, field, summary, fileUrl, fileType, isNew },
    });

    return NextResponse.json(document, { status: 201 });
}

export async function DELETE(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) return NextResponse.json({ error: 'Missing document ID' }, { status: 400 });

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
}
