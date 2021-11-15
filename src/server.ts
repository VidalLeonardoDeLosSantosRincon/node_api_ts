import express from 'express';
import morgan from 'morgan';
import helmet from  "helmet";
import compression from "compression";
import cors from "cors";

//#routes
import { appRoutes } from "./routes/routes";
import { postRoutes } from "./routes/postRoutes";
import { userRoutes } from './routes/userRoutes';

//#db
import {db} from "./db/connection";

class Server {
    public app: express.Application;
    public port: number | string;

    constructor(){
        this.app = express();
        this.port = process.env.PORT || 3000; 
        this.config();
        this.routes();
    }

    config(){
        //#settings
        this.app.set('port', this.port);

        //#mongodb
        db.connect("mongodb://localhost/restapits");

        //#middlewares
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:false}));
        this.app.use(morgan('dev'));
        this.app.use(helmet());
        this.app.use(compression());
        this.app.use(cors());
    }

    routes(){
        this.app.use(appRoutes);
        this.app.use('/api/posts', postRoutes);
        this.app.use('/api/users', userRoutes);
    }

    start(){
        this.app.listen(this.app.get('port'), () => {
            console.log(`server running on port: ${this.port}`);
        });
    }
}

const server = new Server();
server.start();