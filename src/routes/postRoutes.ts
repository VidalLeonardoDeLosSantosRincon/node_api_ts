import {Request, Response, Router} from "express";
import { Post } from "../models/post";

class PostRoutes {
    public router: Router;

    constructor(){
        this.router = Router();
        this.routes();
    }

    async get(req: Request, res: Response): Promise<void>{
        const { url } = req.params;
        const post = await Post.findOne({url});
        res.json(post);
    }

    async getAll(req: Request, res: Response): Promise<void>{
        const posts = await Post.find();
        res.json(posts);
    }

    async create(req: Request, res: Response): Promise<void>{
        const { author, url, title, content, image } = req.body;
        const new_post = new Post({author, url, title, content, image});
        await new_post.save();
        res.json({data: new_post});
    }

    async update(req: Request, res: Response): Promise<void>{
        const {url} = req.params;
        let post_object = { ...req.body}
        post_object.updated_date = Date.now;
        const updated_post = new Post({...post_object});

        const result = await Post.findOneAndUpdate({url}, updated_post, {new: true});
        res.json(result);
    }

    async delete(req: Request, res: Response): Promise<void>{
      const {url} = req.params;
      const post = await Post.findOne({url});
      await Post.findOneAndDelete({url});
      res.json({deleted: {...post._doc}});
    }

    routes(){
        this.router.get("/", this.getAll);
        this.router.get("/:url", this.get);
        this.router.post("/", this.create);
        this.router.put('/:url', this.update);
        this.router.delete("/:url", this.delete);
    }
}

export const postRoutes = new PostRoutes().router;
