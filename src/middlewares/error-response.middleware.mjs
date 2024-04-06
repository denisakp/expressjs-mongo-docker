function errorResponseMiddleware(error, req, res, next) {
    return res.status(500).json({message: error.message});
}

export default errorResponseMiddleware;
