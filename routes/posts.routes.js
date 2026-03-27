import { Router } from "express";
import { createPosts, deletedPost, getAllPosts, getOnePost, getPostsByComment, getPostsCountLikes, updatedPost } from "../controllers/posts.controller.js";

const postsRouter = Router();

postsRouter
    .get("/posts", getAllPosts)
    .post("/posts", createPosts)
    .put("/posts/:id", updatedPost)
    .delete("/posts/:id", deletedPost)
    .get("/posts/:id", getOnePost)
    .get("/posts/:id/comments", getPostsByComment)
    .get("/posts/:id/likes-count", getPostsCountLikes);

export default postsRouter;
