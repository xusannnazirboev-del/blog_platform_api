import { Router } from "express";
import postsRouter from "./posts.routes.js";
import usersRouter from "./user.routes.js";
import commentRouter from "./comments.routes.js";
import likesRouter from "./likes.routes.js";

const apiRouter = Router();

apiRouter.use(usersRouter,postsRouter,commentRouter,likesRouter);

export default apiRouter;
