import {Router} from "express";

// project imports
import blogRouter from "./modules/blog/blog.router.mjs";
import healthcheckRouter from "./modules/healthcheck/healthcheck.router.mjs";

const router = Router({mergeParams: true});

router.use('/healthcheck', healthcheckRouter);
router.use('/blog', blogRouter);

export default router;
