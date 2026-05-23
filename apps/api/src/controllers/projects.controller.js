import { getAuth } from "@clerk/express";
import prisma from "../config/prisma.ts";
import logger from "../utils/logger.js";

export const getProjects = async (req, res) => {
  logger.enter("Get Projects Controller");
  try {
    let { userId } = getAuth(req);
    const clerkId = userId;
    logger.info(`Finding user with clerkId ${clerkId} in the database`);
    let user = await prisma.user.findUnique({
      where: {
        clerkId: clerkId,
      },
    });
    if (!user) {
      logger.error(`User with clerkId ${clerkId} not found`);
      res.status(404).json({
        success: false,
        message: " User not found",
        error: "NOT FOUND",
      });
    }
    userId = user.id;

    const projects = await prisma.project.findMany({
      where: {
        userId: userId,
      },
      include: {
        phases: {
          include: {
            milestones: {
              include: { tasks: true },
            },
          },
        },
      },
    });
    logger.success(
      `Projects fetched successfully from db for user with clerkId ${clerkId}`,
    );
    logger.info(`Fetched projects: ${JSON.stringify(projects)}`);
    res.status(200).json({
      success: true,
      message: "Projects fetched successfully",
      data: { projects: projects },
    });
  } catch (error) {
    logger.error(`Error while fetching projects. ERROR: ${error.message}`);
    res.status(500).json({
      success: false,
      message: "Error while fetching projects",
      error: error.message,
    });
  }
};

export const addProject = async (req, res) => {
  logger.enter("Add Project Controller");
  try {
    let { userId } = req.auth();
    const clerkId = userId;
    const { project } = req.body;
    logger.info(`Received project data: ${project}`);
    logger.info(`Finding user with clerkId ${clerkId} in the database`);
    const user = await prisma.user.findUnique({
      where: {
        clerkId: clerkId,
      },
    });
    if (!user) {
      logger.error(`User with clerkId ${clerkId} not found`);
      res.status(404).json({
        success: false,
        message: "User not found",
        error: "NOT FOUND",
      });
    }
    userId = user.id;
    const createdProject = await prisma.project.create({
      data: {
        ...project,
        phases: {
          create: (project.phases || []).map((phase) => ({
            ...phase,
            milestones: {
              create: (phase.milestones || []).map((milestone) => ({
                ...milestone,
                tasks: {
                  create: milestone.tasks || [],
                },
              })),
            },
          })),
        },
        user: {
          connect: { id: userId },
        },
      },
    });
    logger.success(
      `Project added successfully for user with clerkId ${clerkId}`,
    );
    logger.info(`Created project: ${JSON.stringify(createdProject)}`);

    res.status(201).json({
      success: true,
      message: "Project create Successfully",
      data: { projectCreated: createdProject },
    });
  } catch (error) {
    logger.error(`Error while adding project. ERROR: ${error.message}`);
    res.status(500).json({
      success: false,
      message: "Failed to add project",
      error: error.message,
    });
  }
};
