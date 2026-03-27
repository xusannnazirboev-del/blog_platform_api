import { Router } from "express";
import { createPosts, deletedPost, getAllPosts, getOnePost, updatedPost } from "../controllers/posts.controller.js";

const postsRouter = Router();

postsRouter
    .get("/posts", getAllPosts)
    .post("/posts", createPosts)
    .put("/posts/:id", updatedPost)
    .delete("/posts/:id", deletedPost)
    .get("/posts/:id", getOnePost);

export default postsRouter;
