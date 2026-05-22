import express from "express";
import { syncUser } from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.get("/sync", syncUser);

export default userRouter;
