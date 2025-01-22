import mongoose, { Schema } from "mongoose";

const blogSchema = new Schema(
    {
     name: {
        type: String,
        required: true
     },
     category: {
        type: String,
        required: true
     },
     status: {
        type: String,
        enum: ['draff', 'published', 'archived'],
        default: draff
     },
     date: {
        type: Date,
        default: Date.now
     },
     view: {
        type: Number,
        default: 0
     },
     title: {
        type: String,
        required: true
     },
     description: {
        type: String,
        required: true
     },
     blogImage: {
        type: String,
        required: true
     },
     content: {
        type: String,
        required: true
     }

}, {
    timestamps: true
});

export const Blog = mongoose.model('Blog', blogSchema);
