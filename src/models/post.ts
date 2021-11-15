import { Schema, model } from "mongoose";

const postSchema = new Schema({
    author: { type: String, required: true },
    url: { type: String, required: true, unique: true, lowercase: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: String,
    created_date: { type: Date, default: Date.now},
    updated_date: { type: Date, default: Date.now}
});

export const Post = model('Post', postSchema);