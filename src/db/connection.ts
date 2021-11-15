import mongoose from "mongoose";

class DB {
    constructor(){
    
    }
    connect(mongo_uri: string){
        const MONGO_URI = process.env.MONGODB_URL || mongo_uri;
        //mongoose.set("useFindAndModify", false);
        mongoose.connect(MONGO_URI, {
            useFindAndModify: false,
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        }).then(db => console.log('DB is connected'))
        .catch((error)=> {
            mongoose.connection.close();
        });
    }
}
export const db = new DB();
