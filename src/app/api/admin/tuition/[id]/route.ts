import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Tuition from '@/models/Tuition';
// import { Error as MongooseError } from 'mongoose';

interface ValidationError extends Error {
    errors: Record<string, { message: string }>;
    name: 'ValidationError';
}

function isValidationError(error: unknown): error is ValidationError {
    return error instanceof Error && error.name === 'ValidationError';
}

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
    } catch (error: unknown) {
        if (isValidationError(error)) {
            const errMsg = Object.values(error.errors)
                .map((e) => e.message)
                .join(', ');
            return NextResponse.json({ error: errMsg || 'Validation failed' }, { status: 400 });
        }
        console.error('PUT tuition error:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Internal server error' },
            { status: 500 },
        );
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    await dbConnect();
    const { id } = params;
    const tuition = await Tuition.findByIdAndDelete(id);
    if (!tuition) return NextResponse.json({ error: 'Tuition not found' }, { status: 404 });
    return NextResponse.json({ message: 'Tuition deleted' });
}
