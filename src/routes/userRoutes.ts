import { Request, Response, Router } from "express";
import {User} from "../models/user";

class UserRoutes{
    public router: Router;

    constructor(){
        this.router = Router();
        this.routes();
    }

    async get(req: Request, res: Response): Promise<void>{
        const { email } = req.params;
        const post = await User.findOne({email});
        res.json(post);
    }

    async getAll(req: Request, res: Response): Promise<void>{
        const posts = await User.find();
        res.json(posts);
    }

    async create(req: Request, res: Response): Promise<void>{
        const { name, email, password, user_name} = req.body;
        const new_user = new User({name, email, password, user_name});
        await new_user.save();
        res.json({created: new_user});
    }

    async update(req: Request, res: Response): Promise<void>{
        const { email } = req.params;
        let user_object = {...req.body};
        user_object.updated_date = Date.now;
        const updated_user = new User({...user_object});

        const result = await User.findOneAndUpdate({email}, updated_user, {new: true});
        res.json(result);
    }

    async delete(req: Request, res: Response): Promise<void>{
        const {email} = req.params;
        const user = await User.findOne({email});
        await User.findOneAndDelete({email});
        res.json({deleted: user._doc });
    }

    routes(){
        this.router.get('/', this.getAll);
        this.router.get('/:email', this.get);
        this.router.post('/', this.create);
        this.router.put('/:email', this.update);
        this.router.delete('/:email', this.delete);
    }
}

export const userRoutes = new UserRoutes().router;
