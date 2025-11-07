import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import ActivityCategory from '@/models/ActivityCategory';
import { Types } from 'mongoose';

export async function GET() {
    try {
        await dbConnect();
        const categories = await ActivityCategory.find({}).sort({ name: 1 });
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
        await dbConnect();
        const { name } = await req.json();

        // Validate input
        if (!name || typeof name !== 'string' || name.trim().length === 0) {
            return NextResponse.json(
                { error: 'Tên danh mục không hợp lệ' },
                { status: 400 }
            );
        }

        // Check if category already exists (case insensitive)
        const existingCategory = await ActivityCategory.findOne({
            name: { $regex: new RegExp(`^${name}$`, 'i') }
        });

        if (existingCategory) {
            return NextResponse.json(
                { error: 'Danh mục đã tồn tại' },
                { status: 400 }
            );
        }

        const category = new ActivityCategory({ name: name.trim() });
        await category.save();

        return NextResponse.json(category, { status: 201 });
    } catch (error) {
        console.error('Error creating category:', error);
        return NextResponse.json(
            { error: 'Lỗi khi tạo danh mục' },
            { status: 500 }
        );
    }
}
