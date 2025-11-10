import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        const categories = await prisma.activityCategory.findMany({
            where: { deletedAt: null },
            orderBy: { name: 'asc' },
            select: {
                id: true,
                name: true,
            },
        });

        return NextResponse.json(categories);
    } catch (error: any) {
        console.error('GET /api/categories/activity error:', error);
        return NextResponse.json(
            {
                error: 'Lỗi khi lấy danh sách danh mục',
                details: error.message,
            },
            { status: 500 }
        );
    }
}
