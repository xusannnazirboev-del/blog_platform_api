import { Router } from "express";
import { createUser, deletedUser, getAllUsers, getOneUser, updatedUser } from "../controllers/user.controller.js";

const usersRouter = Router();

usersRouter.get("/users", getAllUsers)
    .post("/user", createUser)
    .put("/user/:id", updatedUser)
    .delete("/user/:id", deletedUser)
    .get("/user/:id", getOneUser);

export default usersRouter;
