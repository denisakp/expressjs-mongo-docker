// project imports
import blogRouter from "./modules/blog/blog.router.mjs";
import healthcheckHandler from "./modules/healthcheck/healthcheck.controller.mjs";

function addApplicationRoutes(app) {
    app.get('/', healthcheckHandler)
    app.use('/api/blog', blogRouter);
}

export default addApplicationRoutes;
