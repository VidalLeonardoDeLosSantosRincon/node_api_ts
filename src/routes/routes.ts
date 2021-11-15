import {request, response, Router} from 'express';

class AppRoutes {
    public router: Router;
    constructor() {
        this.router = Router();
        this.routes();
    }
    routes(){
        this.router.get("/", (req, res) => {
            res.send(JSON.stringify({ Api: "/api/posts" }));
        });
    }
}

export const appRoutes = new AppRoutes().router;
