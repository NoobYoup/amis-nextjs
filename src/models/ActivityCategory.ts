import mongoose, { Schema } from 'mongoose';
import mongooseDelete from 'mongoose-delete';

const activityCategorySchema = new Schema(
    {
        name: { 
            type: String, 
            required: true, 
            unique: true,
            trim: true,
            minlength: 1
        },
    },
    { 
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

// Add soft delete plugin
activityCategorySchema.plugin(mongooseDelete, { 
    overrideMethods: true,
    deletedAt: true,
    deletedBy: true
});

// Add unique index for name (case insensitive)
activityCategorySchema.index({ name: 1 }, { unique: true, collation: { locale: 'en', strength: 2 } });

export default mongoose.models.ActivityCategory || 
       mongoose.model('ActivityCategory', activityCategorySchema);
