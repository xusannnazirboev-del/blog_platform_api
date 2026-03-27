import { Router } from "express";
import { createLike, deletedLike } from "../controllers/likes.controller.js";

const likesRouter = Router();

likesRouter.post("/posts/:id/like", createLike).delete("/posts/:id/like",deletedLike);

export default likesRouter;
