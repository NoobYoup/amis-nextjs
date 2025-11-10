import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const search = searchParams.get('search') || '';
        const year = searchParams.get('year') || '';
        const type = searchParams.get('type') || '';
        const field = searchParams.get('field') || '';
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '100');

        const where: any = {};

        // Search by title or number
        if (search) {
            where.OR = [
                { title: { contains: search } },
                { number: { contains: search } },
            ];
        }

        // Filter by year
        if (year && year !== 'all') {
            const startDate = new Date(`${year}-01-01`);
            const endDate = new Date(`${year}-12-31`);
            where.date = {
                gte: startDate,
                lte: endDate,
            };
        }

        // Filter by type
        if (type && type !== 'all') {
            where.type = type;
        }

        // Filter by field
        if (field && field !== 'all') {
            where.field = field;
        }

        const skip = (page - 1) * limit;

        const [documents, total] = await Promise.all([
            prisma.document.findMany({
                where,
                orderBy: [
                    { isNew: 'desc' },
                    { date: 'desc' },
                ],
                skip,
                take: limit,
            }),
            prisma.document.count({ where }),
        ]);

        return NextResponse.json({
            data: documents,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        });
    } catch (error: any) {
        console.error('GET /api/documents error:', error);
        return NextResponse.json(
            {
                error: 'Lỗi khi lấy danh sách văn bản',
                details: error.message,
            },
            { status: 500 }
        );
    }
}
