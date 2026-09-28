import prisma from "../config/prisma.ts";
import logger from "../utils/logger.js";

/**
 * Helper function to recalculate and update Milestone & Phase progress percentage
 */
export async function recalculateProgress(milestoneId) {
  try {
    // 1. Fetch milestone with all its tasks
    const milestone = await prisma.milestone.findUnique({
      where: { id: milestoneId },
      include: { tasks: true, phase: { include: { milestones: true } } },
    });

    if (!milestone) return;

    // Calculate milestone progress
    const totalTasks = milestone.tasks.length;
    const completedTasks = milestone.tasks.filter((t) => t.done).length;
    const milestoneProgress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    await prisma.milestone.update({
      where: { id: milestoneId },
      data: { progress: milestoneProgress },
    });

    // 2. Calculate parent phase progress
    const phaseId = milestone.phaseId;
    const allMilestones = await prisma.milestone.findMany({
      where: { phaseId },
    });

    const phaseProgress =
      allMilestones.length > 0
        ? Math.round(
            allMilestones.reduce((acc, m) => acc + (m.id === milestoneId ? milestoneProgress : m.progress), 0) /
              allMilestones.length
          )
        : 0;

    await prisma.phase.update({
      where: { id: phaseId },
      data: {
        progress: phaseProgress,
        ...(phaseProgress === 100 ? { status: "completed" } : phaseProgress > 0 ? { status: "active" } : {}),
      },
    });

    logger.info(`Updated progress for Milestone ${milestoneId} (${milestoneProgress}%) and Phase ${phaseId} (${phaseProgress}%)`);
  } catch (err) {
    logger.error(`Error recalculating progress: ${err.message}`);
  }
}

export const updateTask = async (req, res) => {
  logger.enter("Update Task Controller");
  try {
    const { taskId } = req.params;
    const { done, title, type, purpose, commands, commitSha, githubIssueId } = req.body;

    const existingTask = await prisma.task.findUnique({
      where: { id: taskId },
    });

    if (!existingTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
        error: "NOT_FOUND",
      });
    }

    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: {
        ...(done !== undefined && { done }),
        ...(title && { title }),
        ...(type && { type }),
        ...(purpose !== undefined && { purpose }),
        ...(commands && { commands }),
        ...(commitSha !== undefined && { commitSha }),
        ...(githubIssueId !== undefined && { githubIssueId }),
      },
    });

    // Recalculate progress for parent Milestone and Phase
    await recalculateProgress(existingTask.milestoneId);

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: { task: updatedTask },
    });
  } catch (error) {
    logger.error(`Error updating task. ERROR: ${error.message}`);
    res.status(500).json({
      success: false,
      message: "Failed to update task",
      error: error.message,
    });
  }
};
