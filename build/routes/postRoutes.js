"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRoutes = void 0;
const express_1 = require("express");
const post_1 = require("../models/post");
class PostRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { url } = req.params;
            const post = yield post_1.Post.findOne({ url });
            res.json(post);
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const posts = yield post_1.Post.find();
            res.json(posts);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { author, url, title, content, image } = req.body;
            const new_post = new post_1.Post({ author, url, title, content, image });
            yield new_post.save();
            res.json({ data: new_post });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { url } = req.params;
            let post_object = Object.assign({}, req.body);
            post_object.updated_date = Date.now;
            const updated_post = new post_1.Post(Object.assign({}, post_object));
            const result = yield post_1.Post.findOneAndUpdate({ url }, updated_post, { new: true });
            res.json(result);
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { url } = req.params;
            const post = yield post_1.Post.findOne({ url });
            yield post_1.Post.findOneAndDelete({ url });
            res.json({ deleted: Object.assign({}, post._doc) });
        });
    }
    routes() {
        this.router.get("/", this.getAll);
        this.router.get("/:url", this.get);
        this.router.post("/", this.create);
        this.router.put('/:url', this.update);
        this.router.delete("/:url", this.delete);
    }
}
exports.postRoutes = new PostRoutes().router;
