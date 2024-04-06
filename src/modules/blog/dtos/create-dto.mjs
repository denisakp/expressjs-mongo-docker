import joi from "joi";

const createBlogSchema = joi.object({
    title: joi.string().required(),
    description: joi.string().optional(),
    content: joi.string().required(),
});

export default createBlogSchema;