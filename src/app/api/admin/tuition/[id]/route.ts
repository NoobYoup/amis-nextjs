import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Tuition from '@/models/Tuition';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    await dbConnect();
    const { id } = params;
    const tuition = await Tuition.findById(id).lean();
    if (!tuition) return NextResponse.json({ error: 'Tuition not found' }, { status: 404 });
    return NextResponse.json(tuition);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        await dbConnect();
        const { id } = params;
        const body = await req.json();

        const tuition = await Tuition.findById(id);
        if (!tuition) return NextResponse.json({ error: 'Tuition not found' }, { status: 404 });

        // Update fields (merge, validate tùy type)
        Object.assign(tuition, body);
        await tuition.save();

        return NextResponse.json(tuition);
    } catch (error: any) {
        if (error.name === 'ValidationError') {
            const errMsg = Object.values(error.errors)
                .map((e: any) => e.message)
                .join(', ');
            return NextResponse.json({ error: errMsg || 'Validation failed' }, { status: 400 });
        }
        console.error('PUT tuition error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    await dbConnect();
    const { id } = params;
    const tuition = await Tuition.findByIdAndDelete(id);
    if (!tuition) return NextResponse.json({ error: 'Tuition not found' }, { status: 404 });
    return NextResponse.json({ message: 'Tuition deleted' });
}
