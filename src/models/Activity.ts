import mongoose, { Schema } from 'mongoose';

const activitySchema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        category: { type: String, required: true, enum: ['Học thuật', 'Thể thao', 'Văn nghệ', 'Ngoại khóa'] },
        date: { type: Date, required: true },
        author: { type: String, required: true },
        thumbnail: { type: String },
        images: [{ type: String }], // Cloudinary URLs
        videos: [{ type: String }], // YouTube embeds
    },
    { timestamps: true },
);

export default mongoose.models.Activity || mongoose.model('Activity', activitySchema);
