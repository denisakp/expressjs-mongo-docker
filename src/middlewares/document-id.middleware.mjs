import joi from "joi";

const documentIdSchema = joi.string().pattern(/^[0-9a-fA-F]{24}$/).message('Invalid MongoDB ObjectId');

function documentIdMiddleware(req, res, next) {
    const documentId = req.params.id;

    // if id is not missing, we send a message error
    if (!documentId)
        return res.status(422).json({message: "missing document id"});

    // validate request documentId
    const {error} = documentIdSchema.validate(documentId);

    // if value is not a mongodb ObjectID, then we throw an error
    if (error)
        return res.status(422).json({message: error.message});

    next();
}

export default documentIdMiddleware;
