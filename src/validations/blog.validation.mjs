import joi from 'joi';

export const createBlogSchema = joi.object({
    title: joi.string().required(),
    description: joi.string().optional(),
    content: joi.string().required(),
});

export const updateBlogSchema = joi.object({
    title: joi.string().required(),
    description: joi.string().optional(),
    content: joi.string().required(),
});

export const documentIdSchema = joi
    .string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .message('Invalid MongoDB ObjectId');
