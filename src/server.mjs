import express from 'express';
import cors from 'cors';
import compression from "compression";

// project imports
import applicationEnv from "./configurations/config.mjs";
import routes from "./router.mjs";
import routeNotFoundMiddleware from "./middlewares/404-routes.middleware.mjs";
import errorResponseMiddleware from "./middlewares/error-response.middleware.mjs";

// express app
const app = express();

// express middlewares
app.use(cors());
app.use(express.json())
app.use(compression());
app.use(errorResponseMiddleware)

// express routers
app.use('/api', routes);

// routes middleware
app.use(routeNotFoundMiddleware);

// express server
const server = app.listen(applicationEnv.port, applicationEnv.host);

console.info("server started on port http://%s:%d", applicationEnv.host, applicationEnv.port)

process.on("SIGTERM", () => {
    console.info('closing express server !')
    server.close()
});

process.on('uncaughtException', (error) => {
    console.error({name: `uncaughtException - ${error.name} `, message: error.message,})
});

process.on('unhandledRejection', (reason) => {
    console.error({name: `unhandledRejection - ${reason.name}`, message: reason.message,})
});

export default server;
