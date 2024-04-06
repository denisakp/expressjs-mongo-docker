// project imports
import { create, find, findOne, deleteOne, updateOne } from "../services/blog.service.mjs";
import {createBlogSchema, documentIdSchema, updateBlogSchema} from "../validations/blog.validation.mjs";
import idInterceptorResponse from "../interceptors/id.interceptor.mjs";

export async function createBlogPostHandler(req, res, next) {
    //request body validation
    const { value, error } = await createBlogSchema.validate(req.body);

    // if validation fails return UNPROCESSABLE ENTITY HTTP error
    if(error)
        return res.status(422).json(error.details);

    try {
        const blog = await create(value);

        if(!blog)
            return res.status(400).json({ message: "Failed to create blog post !" });

        return res.status(201).json(idInterceptorResponse(blog));
    } catch (error) {
        console.log("Failed to create blog post: %s ", error.message);
        next(error);
    }
}

export async function findBlogPostsHandler(req, res, next) {
    const limit = parseInt(req.query.limit) || 25;
    const page = parseInt(req.query.page) || 1;

    try {
        const posts = await find({limit, page});
        return res.status(200).json(idInterceptorResponse(posts));
    }catch (error) {
        console.log("Failed to load blog posts: %s ", id, error.message);
        next(error);
    }
}

export async function findOneBlogPostHandler(req, res, next) {
    // blog id validation
    const id = req.params.id;

    try {
        const document = await findOne(id);

       if(!document)
           return res.status(404).json({ message: `Document with id ${id} not found`})

        return res.status(200).json(idInterceptorResponse(document));
    } catch (error) {
        console.log("Failed to retrieve blog post with id %s: %s", id, error.message);
        next(error);
    }
}

export async function updateBlogPostHandler(req, res, next) {
    // blog id validation
    const id = req.params.id;

    //request body validation
    const { value, error } = await updateBlogSchema.validate(req.body);

    // if validation fails return UNPROCESSABLE ENTITY HTTP error
    if(error)
        return res.status(422).json(error.details);

    try {
        const response = await updateOne(id, value);

        if(!response)
            return res.status(400).json({ message: `Blog with id ${id} not found` });

        return res.status(200).json(idInterceptorResponse(response));
    }catch (error) {
        console.log("Failed to update blog post with id %s: %s ", id, error.message);
        next(error);
    }
}

export async function deleteBlogPostHandler(req, res, next) {
    // blog id validation
    const id = req.params.id;

    try {
        const response = await deleteOne(id);

        if(!response)
            return res.status(400).json({ message: `Blog with id ${id} not found` });

        return res.sendStatus(204);

    }catch (error) {
        console.log("Failed to delete blog post with id %s: %s ", id, error.message);
        next(error);
    }
}
