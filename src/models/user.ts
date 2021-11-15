import {Schema, model} from "mongoose"

const UserSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, require: true},
    user_name: {type: String, required: true, unique: true},
    created_date: {type: Date, default: Date.now},
    updated_date: {type: Date, default: Date.now}
});

export const User = model("User", UserSchema);