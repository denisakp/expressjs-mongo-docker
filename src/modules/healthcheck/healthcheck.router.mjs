import {Router} from "express";

// project imports
import healthcheckHandler from "./healthcheck.controller.mjs";

const healthcheckRouter = Router();

healthcheckRouter.get('/', healthcheckHandler);

export default healthcheckRouter;
