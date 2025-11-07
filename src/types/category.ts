import { Types } from 'mongoose';

export interface Category {
    _id: string | Types.ObjectId;
    name: string;
    createdAt: Date | string;
    updatedAt: Date | string;
    deletedAt?: Date | string;
    deleted?: boolean;
}
