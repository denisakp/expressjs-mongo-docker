import joi from 'joi';

//project imports
import {documentIdSchema} from "../validations/blog.validation.mjs";

function objectIdMiddleware(req, res, next) {
    const documentId = req.params.id;

    // if id is not missing we send a message error
    if(!documentId)
        return res.status(422).json({ message: "missing document id"});

    // validate request documentId
    const { error } = documentIdSchema.validate(documentId);

    // if value is not a mongodb ObjectID then we throw an error
    if (error)
        return res.status(422).json({ message: error.message });

    next();
}

export default objectIdMiddleware;
