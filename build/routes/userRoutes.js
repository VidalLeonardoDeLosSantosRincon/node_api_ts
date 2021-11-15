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
exports.userRoutes = void 0;
const express_1 = require("express");
const user_1 = require("../models/user");
class UserRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.params;
            const post = yield user_1.User.findOne({ email });
            res.json(post);
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const posts = yield user_1.User.find();
            res.json(posts);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password, user_name } = req.body;
            const new_user = new user_1.User({ name, email, password, user_name });
            yield new_user.save();
            res.json({ created: new_user });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.params;
            let user_object = Object.assign({}, req.body);
            user_object.updated_date = Date.now;
            const updated_user = new user_1.User(Object.assign({}, user_object));
            const result = yield user_1.User.findOneAndUpdate({ email }, updated_user, { new: true });
            res.json(result);
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.params;
            const user = yield user_1.User.findOne({ email });
            yield user_1.User.findOneAndDelete({ email });
            res.json({ deleted: user._doc });
        });
    }
    routes() {
        this.router.get('/', this.getAll);
        this.router.get('/:email', this.get);
        this.router.post('/', this.create);
        this.router.put('/:email', this.update);
        this.router.delete('/:email', this.delete);
    }
}
exports.userRoutes = new UserRoutes().router;
