"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const mongoose_1 = require("mongoose");
const postSchema = new mongoose_1.Schema({
    author: { type: String, required: true },
    url: { type: String, required: true, unique: true, lowercase: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: String,
    created_date: { type: Date, default: Date.now },
    updated_date: { type: Date, default: Date.now }
});
exports.Post = (0, mongoose_1.model)('Post', postSchema);
