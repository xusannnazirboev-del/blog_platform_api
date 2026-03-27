import { Router } from "express";
import {createComment, deletedComment, getAllComments, getpostsWithComment } from "../controllers/comments.controller.js";

const commentRouter = Router();

commentRouter
    .get("/comments", getAllComments)
    .post("/comments",createComment)
    .get("/posts/:id/comments",getpostsWithComment)
    .delete("/comments/:id",deletedComment);

export default commentRouter;
