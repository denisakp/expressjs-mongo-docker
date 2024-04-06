import { Router } from "express";

// project imports
import {
    createBlogPostHandler,
    deleteBlogPostHandler,
    findBlogPostsHandler,
    findOneBlogPostHandler,
    updateBlogPostHandler
} from "../controllers/blog.controler.mjs";
import objectIdMiddleware from "../middlewares/objectid.middleware.mjs";


const blogRouter = Router({ mergeParams: true });

blogRouter.get('/:id', objectIdMiddleware,  findOneBlogPostHandler);
blogRouter.patch('/:id', objectIdMiddleware, updateBlogPostHandler);
blogRouter.delete('/:id',objectIdMiddleware, deleteBlogPostHandler);
blogRouter.post('/', createBlogPostHandler);
blogRouter.get('/', findBlogPostsHandler);


export default blogRouter;
