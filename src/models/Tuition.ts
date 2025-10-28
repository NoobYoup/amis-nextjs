import mongoose, { Schema } from 'mongoose';

const tuitionSchema = new Schema(
    {
        type: { type: String, required: true, enum: ['grade', 'discount', 'schedule', 'fee'] },
        // Common
        description: { type: String },
        // Grade-specific
        grade: { type: String },
        level: { type: String, enum: ['elementary', 'middle'] },
        tuition: { type: String },
        // Discount-specific
        discount: { type: String },
        // Schedule-specific
        period: { type: String },
        date: { type: Date },
        months: { type: String },
        // Fee-specific
        name: { type: String, required: true },
        typeFee: { type: String, enum: ['included', 'notIncluded'] },
    },
    { timestamps: true },
);

export default mongoose.models.Tuition || mongoose.model('Tuition', tuitionSchema);
