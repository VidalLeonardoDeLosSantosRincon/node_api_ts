"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
//#routes
const routes_1 = require("./routes/routes");
const postRoutes_1 = require("./routes/postRoutes");
const userRoutes_1 = require("./routes/userRoutes");
//#db
const connection_1 = require("./db/connection");
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || 3000;
        this.config();
        this.routes();
    }
    config() {
        //#settings
        this.app.set('port', this.port);
        //#mongodb
        connection_1.db.connect("mongodb://localhost/restapits");
        //#middlewares
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use((0, helmet_1.default)());
        this.app.use((0, compression_1.default)());
        this.app.use((0, cors_1.default)());
    }
    routes() {
        this.app.use(routes_1.appRoutes);
        this.app.use('/api/posts', postRoutes_1.postRoutes);
        this.app.use('/api/users', userRoutes_1.userRoutes);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log(`server running on port: ${this.port}`);
        });
    }
}
const server = new Server();
server.start();
