import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Tuition from '@/models/Tuition';

export async function GET(req: NextRequest) {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type') || ''; // e.g., 'grade'
    const search = searchParams.get('search') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = 10;

    const query: any = {};
    if (type) query.type = type;
    if (search)
        query.$or = [{ description: { $regex: search, $options: 'i' } }, { name: { $regex: search, $options: 'i' } }];

    const tuitions = await Tuition.find(query)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);

    const total = await Tuition.countDocuments(query);

    return NextResponse.json({ data: tuitions, total, page, pages: Math.ceil(total / limit) });
}

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const body = await req.json();

        if (!body.type || !body.description)
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });

        if (body.type === 'grade' && (!body.grade || !body.tuition))
            return NextResponse.json({ error: 'Missing grade/tuition' }, { status: 400 });
        if (body.type === 'fee' && (!body.name || !body.typeFee))
            return NextResponse.json({ error: 'Missing name/typeFee' }, { status: 400 });
        // Tương tự discount/schedule...

        const tuition = new Tuition(body);
        await tuition.save();

        return NextResponse.json(tuition, { status: 201 });
    } catch (error: any) {
        if (error.name === 'ValidationError') {
            const errMsg = Object.values(error.errors)
                .map((e: any) => e.message)
                .join(', ');
            return NextResponse.json({ error: errMsg || 'Validation failed' }, { status: 400 });
        }
        console.error('POST tuition error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
