import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true, lowercase: true, trim: true },
        password: { type: String, required: true },
        role: { type: String, default: 'admin', enum: ['admin'] },
    },
    { timestamps: true, collection: 'users' },
);

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

userSchema.methods.comparePassword = async function (password: string) {
    return bcrypt.compare(password, this.password);
};

export default mongoose.models.User || mongoose.model('User', userSchema);
