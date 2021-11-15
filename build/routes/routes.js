"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRoutes = void 0;
const express_1 = require("express");
class AppRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.get("/", (req, res) => {
            res.send(JSON.stringify({ Api: "/api/posts" }));
        });
    }
}
exports.appRoutes = new AppRoutes().router;
