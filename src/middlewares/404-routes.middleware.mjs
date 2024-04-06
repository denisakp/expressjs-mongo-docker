function routeNotFoundMiddleware(req, res) {
    return res.status(404).send("🤔 sorry but, there's no handler for this route 😴");
}

export default routeNotFoundMiddleware;
