"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
class DB {
    constructor() {
    }
    connect(mongo_uri) {
        const MONGO_URI = process.env.MONGODB_URL || mongo_uri;
        //mongoose.set("useFindAndModify", false);
        mongoose_1.default.connect(MONGO_URI, {
            useFindAndModify: false,
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        }).then(db => console.log('DB is connected'))
            .catch((error) => {
            mongoose_1.default.connection.close();
        });
    }
}
exports.db = new DB();
