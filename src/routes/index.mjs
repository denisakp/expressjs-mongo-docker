import { Router } from "express";

// project imports
import healthcheckRouter from "./healthcheck.router.mjs";
import blogRouter from "./blog.router.mjs";

const router = Router({ mergeParams: true });

router.use('/healthcheck', healthcheckRouter);
router.use('/blog', blogRouter);

export default router;
