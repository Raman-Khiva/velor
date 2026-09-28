import prisma from "../config/prisma.ts";
import logger from "../utils/logger.js";

export const getProjects = async (req, res) => {
  logger.enter("Get Projects Controller");
  try {
    let { userId } = req.auth();
    const clerkId = userId;
    logger.info(`Finding user with clerkId ${clerkId} in the database`);
    let user = await prisma.user.findUnique({
      where: {
        clerkId: clerkId,
      },
    });
    if (!user) {
      logger.error(`User with clerkId ${clerkId} not found`);
      return res.status(404).json({
        success: false,
        message: "User not found",
        error: "NOT_FOUND",
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
      return res.status(404).json({
        success: false,
        message: "User not found",
        error: "NOT_FOUND",
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
      message: "Project created successfully",
      data: { project: createdProject },
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

export const getProjectById = async (req, res) => {
  logger.enter("Get Project By ID Controller");
  try {
    const { id } = req.params;
    const project = await prisma.project.findUnique({
      where: { id },
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

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
        error: "NOT_FOUND",
      });
    }

    res.status(200).json({
      success: true,
      message: "Project fetched successfully",
      data: { project },
    });
  } catch (error) {
    logger.error(`Error while fetching project by ID. ERROR: ${error.message}`);
    res.status(500).json({
      success: false,
      message: "Error fetching project",
      error: error.message,
    });
  }
};

export const updateProject = async (req, res) => {
  logger.enter("Update Project Controller");
  try {
    const { id } = req.params;
    const { name, description, type, techStack, status, repoUrl, githubRepo, architecture, githubWebhookSecret, startDate, targetDate } = req.body;

    const updatedProject = await prisma.project.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(description !== undefined && { description }),
        ...(type !== undefined && { type }),
        ...(techStack && { techStack }),
        ...(status !== undefined && { status }),
        ...(repoUrl !== undefined && { repoUrl }),
        ...(githubRepo !== undefined && { githubRepo }),
        ...(architecture !== undefined && { architecture }),
        ...(githubWebhookSecret !== undefined && { githubWebhookSecret }),
        ...(startDate && { startDate: new Date(startDate) }),
        ...(targetDate && { targetDate: new Date(targetDate) }),
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

    res.status(200).json({
      success: true,
      message: "Project updated successfully",
      data: { project: updatedProject },
    });
  } catch (error) {
    logger.error(`Error updating project. ERROR: ${error.message}`);
    res.status(500).json({
      success: false,
      message: "Failed to update project",
      error: error.message,
    });
  }
};