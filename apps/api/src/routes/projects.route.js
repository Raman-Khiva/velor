import express from "express";
import { addProject, getProjects, getProjectById, updateProject } from "../controllers/projects.controller.js";
import { updateTask } from "../controllers/tasks.controller.js";

const projectsRouter = express.Router();

projectsRouter.get("/", getProjects);
projectsRouter.get("/:id", getProjectById);
projectsRouter.post("/", addProject);
projectsRouter.patch("/:id", updateProject);
projectsRouter.patch("/:projectId/tasks/:taskId", updateTask);

export default projectsRouter;
