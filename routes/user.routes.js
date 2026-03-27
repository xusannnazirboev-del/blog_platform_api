import { Router } from "express";
import {
    createUser,
    deletedUser,
    getAllUsers,
    getOneUser,
    getPostsByUserId,
    getPostsCountByUserId,
    updatedUser,
} from "../controllers/user.controller.js";

const usersRouter = Router();

usersRouter
    .get("/users", getAllUsers)
    .post("/user", createUser)
    .put("/user/:id", updatedUser)
    .delete("/user/:id", deletedUser)
    .get("/user/:id", getOneUser)
    .get("/user/:id/posts", getPostsByUserId)
    .get("/user/:id/posts-count", getPostsCountByUserId);

export default usersRouter;
