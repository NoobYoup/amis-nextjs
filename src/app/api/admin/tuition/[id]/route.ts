import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// ===== GET: Lấy thông tin học phí theo id =====
export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await context.params;

        const tuition = await prisma.tuition.findUnique({ where: { id } });
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
        const { id } = await context.params;
        const body = await req.json();

        const tuition = await prisma.tuition.findUnique({ where: { id } });
        if (!tuition) {
            return NextResponse.json({ error: 'Tuition not found' }, { status: 404 });
        }

        // Update tuition
        const updatedTuition = await prisma.tuition.update({
            where: { id },
            data: body,
        });

        return NextResponse.json(updatedTuition);
    } catch (error: unknown) {
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
        const { id } = await context.params;

        const tuition = await prisma.tuition.findUnique({ where: { id } });
        if (!tuition) {
            return NextResponse.json({ error: 'Tuition not found' }, { status: 404 });
        }

        await prisma.tuition.delete({ where: { id } });

        return NextResponse.json({ message: 'Tuition deleted' });
    } catch (error) {
        console.error('Error deleting tuition:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
