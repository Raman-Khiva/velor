import express from "express";
import { handleGithubWebhook } from "../controllers/webhooks.controller.js";

const webhooksRouter = express.Router();

webhooksRouter.post("/github", handleGithubWebhook);

export default webhooksRouter;
