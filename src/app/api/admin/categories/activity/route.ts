import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        const categories = await prisma.activityCategory.findMany({
            where: { deletedAt: null },
            orderBy: { name: 'asc' },
        });
        return NextResponse.json(categories);
    } catch (error) {
        return NextResponse.json(
            { error: 'Lỗi khi lấy danh sách danh mục' },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        const { name } = await req.json();

        // Validate input
        if (!name || typeof name !== 'string' || name.trim().length === 0) {
            return NextResponse.json(
                { error: 'Tên danh mục không hợp lệ' },
                { status: 400 }
            );
        }

        // Check if category already exists (case insensitive)
        const existingCategory = await prisma.activityCategory.findFirst({
            where: {
                name: {
                    equals: name.trim(),
                    mode: 'insensitive',
                },
                deletedAt: null,
            },
        });

        if (existingCategory) {
            return NextResponse.json(
                { error: 'Danh mục đã tồn tại' },
                { status: 400 }
            );
        }

        const category = await prisma.activityCategory.create({
            data: { name: name.trim() },
        });

        return NextResponse.json(category, { status: 201 });
    } catch (error) {
        console.error('Error creating category:', error);
        return NextResponse.json(
            { error: 'Lỗi khi tạo danh mục' },
            { status: 500 }
        );
    }
}
