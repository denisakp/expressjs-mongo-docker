import {Router} from "express";

// project imports
import blogRouter from "./modules/blog/blog.router.mjs";
import healthcheckHandler from "./modules/healthcheck/healthcheck.controller.mjs";

const router = Router({mergeParams: true});

router.get('/', healthcheckHandler);
router.use('/blog', blogRouter);

export default router;
