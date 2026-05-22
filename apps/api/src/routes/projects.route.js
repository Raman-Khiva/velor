import express from "express";
import { addProject, getProjects } from "../controllers/projects.controller.js";

const projectsRouter = express.Router();

projectsRouter.get("/", getProjects);
projectsRouter.post("/", addProject);

export default projectsRouter;
