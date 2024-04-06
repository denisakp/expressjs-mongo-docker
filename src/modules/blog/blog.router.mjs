import {Router} from "express";

// project imports
import {
    createBlogPostHandler,
    deleteBlogPostHandler,
    findBlogPostsHandler,
    findOneBlogPostHandler,
    updateBlogPostHandler
} from "./blog.controler.mjs";
import documentIdMiddleware from "../../middlewares/document-id.middleware.mjs";


const blogRouter = Router({mergeParams: true});

blogRouter.get('/:id', documentIdMiddleware, findOneBlogPostHandler);
blogRouter.patch('/:id', documentIdMiddleware, updateBlogPostHandler);
blogRouter.delete('/:id', documentIdMiddleware, deleteBlogPostHandler);
blogRouter.post('/', createBlogPostHandler);
blogRouter.get('/', findBlogPostsHandler);


export default blogRouter;
