import mongoose, { Schema } from 'mongoose';

const documentSchema = new Schema(
    {
        title: { type: String, required: true },
        type: {
            type: String,
            required: true,
            enum: ['Thông tư', 'Quyết định', 'Quy chế', 'Kế hoạch', 'Quy định', 'Hướng dẫn'],
        },
        number: { type: String, required: true },
        date: { type: Date, required: true },
        field: {
            type: String,
            required: true,
            enum: ['Quản lý giáo dục', 'Tuyển sinh', 'Đánh giá', 'Kế hoạch', 'Học sinh', 'Chương trình'],
        },
        summary: { type: String },
        fileUrl: { type: String, required: true }, // Cloudinary URL
        fileType: { type: String, enum: ['pdf', 'doc', 'docx'], default: 'pdf' },
        isNew: { type: Boolean, default: false },
    },
    { timestamps: true },
);

export default mongoose.models.Document || mongoose.model('Document', documentSchema);
