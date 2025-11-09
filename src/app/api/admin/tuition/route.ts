import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type') || '';
    const search = searchParams.get('search') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = 10;

    const where: any = {};
    if (type) where.type = type;
    if (search) {
        where.OR = [
            { description: { contains: search, mode: 'insensitive' } },
            { name: { contains: search, mode: 'insensitive' } },
        ];
    }

    const [tuitions, total] = await Promise.all([
        prisma.tuition.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            skip: (page - 1) * limit,
            take: limit,
        }),
        prisma.tuition.count({ where }),
    ]);

    return NextResponse.json({ data: tuitions, total, page, pages: Math.ceil(total / limit) });
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        if (!body.type || !body.name)
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });

        if (body.type === 'grade' && (!body.grade || !body.tuition))
            return NextResponse.json({ error: 'Missing grade/tuition' }, { status: 400 });
        if (body.type === 'fee' && (!body.name || !body.typeFee))
            return NextResponse.json({ error: 'Missing name/typeFee' }, { status: 400 });

        const tuition = await prisma.tuition.create({
            data: body,
        });

        return NextResponse.json(tuition, { status: 201 });
    } catch (error) {
        console.error('POST tuition error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
