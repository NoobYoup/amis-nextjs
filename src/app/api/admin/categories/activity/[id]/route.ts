import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import ActivityCategory from '@/models/ActivityCategory';
import Activity from '@/models/Activity';
import { Types } from 'mongoose';

// Get single category
export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await dbConnect();
        
        if (!Types.ObjectId.isValid(params.id)) {
            return NextResponse.json(
                { error: 'ID danh mục không hợp lệ' },
                { status: 400 }
            );
        }

        const category = await ActivityCategory.findById(params.id);
        
        if (!category) {
            return NextResponse.json(
                { error: 'Không tìm thấy danh mục' },
                { status: 404 }
            );
        }

        return NextResponse.json(category);
    } catch (error) {
        console.error('Error getting category:', error);
        return NextResponse.json(
            { error: 'Lỗi khi lấy thông tin danh mục' },
            { status: 500 }
        );
    }
}

// Update category
export async function PUT(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await dbConnect();
        
        if (!Types.ObjectId.isValid(params.id)) {
            return NextResponse.json(
                { error: 'ID danh mục không hợp lệ' },
                { status: 400 }
            );
        }

        const { name } = await req.json();

        // Validate input
        if (!name || typeof name !== 'string' || name.trim().length === 0) {
            return NextResponse.json(
                { error: 'Tên danh mục không hợp lệ' },
                { status: 400 }
            );
        }

        // Check if category exists
        const existingCategory = await ActivityCategory.findById(params.id);
        if (!existingCategory) {
            return NextResponse.json(
                { error: 'Không tìm thấy danh mục' },
                { status: 404 }
            );
        }

        // Check if new name is already taken
        const duplicateCategory = await ActivityCategory.findOne({
            _id: { $ne: params.id },
            name: { $regex: new RegExp(`^${name}$`, 'i') }
        });

        if (duplicateCategory) {
            return NextResponse.json(
                { error: 'Tên danh mục đã tồn tại' },
                { status: 400 }
            );
        }

        const updatedCategory = await ActivityCategory.findByIdAndUpdate(
            params.id,
            { name: name.trim() },
            { new: true, runValidators: true }
        );

        return NextResponse.json(updatedCategory);
    } catch (error) {
        console.error('Error updating category:', error);
        return NextResponse.json(
            { error: 'Lỗi khi cập nhật danh mục' },
            { status: 500 }
        );
    }
}

// Delete category (soft delete)
export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await dbConnect();
        
        if (!Types.ObjectId.isValid(params.id)) {
            return NextResponse.json(
                { error: 'ID danh mục không hợp lệ' },
                { status: 400 }
            );
        }

        // Check if category is being used by any activity
        const activityCount = await Activity.countDocuments({ 
            category: params.id,
            deleted: { $ne: true }
        });

        if (activityCount > 0) {
            return NextResponse.json(
                { 
                    error: 'Không thể xóa danh mục đang được sử dụng bởi các hoạt động',
                    activityCount
                },
                { status: 400 }
            );
        }

        // Perform soft delete
        const category = await ActivityCategory.findById(params.id);
        
        if (!category) {
            return NextResponse.json(
                { error: 'Không tìm thấy danh mục' },
                { status: 404 }
            );
        }

        await category.delete();

        return NextResponse.json({ 
            success: true, 
            message: 'Đã xóa danh mục thành công' 
        });
    } catch (error) {
        console.error('Error deleting category:', error);
        return NextResponse.json(
            { error: 'Lỗi khi xóa danh mục' },
            { status: 500 }
        );
    }
}
