import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Tuition from '@/models/Tuition';

// Kiểu lỗi validate từ Mongoose
interface ValidationError extends Error {
    errors: Record<string, { message: string }>;
    name: 'ValidationError';
}

function isValidationError(error: unknown): error is ValidationError {
    return error instanceof Error && error.name === 'ValidationError';
}

// ===== GET: Lấy thông tin học phí theo id =====
export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect();
        const { id } = await context.params; // ✅ phải await trong Next.js 15+

        const tuition = await Tuition.findById(id).lean();
        if (!tuition) {
            return NextResponse.json({ error: 'Tuition not found' }, { status: 404 });
        }

        return NextResponse.json(tuition);
    } catch (error) {
        console.error('Error fetching tuition:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// ===== PUT: Cập nhật thông tin học phí =====
export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect();
        const { id } = await context.params; // ✅ phải await
        const body = await req.json();

        const tuition = await Tuition.findById(id);
        if (!tuition) {
            return NextResponse.json({ error: 'Tuition not found' }, { status: 404 });
        }

        // Cập nhật dữ liệu (merge)
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

// ===== DELETE: Xóa thông tin học phí =====
export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect();
        const { id } = await context.params; // ✅ phải await

        const tuition = await Tuition.findByIdAndDelete(id);
        if (!tuition) {
            return NextResponse.json({ error: 'Tuition not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Tuition deleted' });
    } catch (error) {
        console.error('Error deleting tuition:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
