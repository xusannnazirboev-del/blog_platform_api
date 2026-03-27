import { Router } from "express";
import { createLike } from "../controllers/likes.controller.js";

const likesRouter = Router();

// likesRouter.post("/posts/:id/like", createLike).delete("/posts/:id/like");

export default likesRouter;
