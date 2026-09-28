import prisma from "../config/prisma.ts";
import logger from "../utils/logger.js";
import { recalculateProgress } from "./tasks.controller.js";

/**
 * Handle incoming GitHub Webhooks (push, pull_request)
 */
export const handleGithubWebhook = async (req, res) => {
  logger.enter("GitHub Webhook Controller");
  try {
    const event = req.headers["x-github-event"];
    const payload = req.body;

    logger.info(`Received GitHub webhook event: ${event}`);

    if (!payload || !payload.repository) {
      return res.status(400).json({ success: false, message: "Invalid payload" });
    }

    const repoFullName = payload.repository.full_name; // e.g. "owner/repo"

    // Find matching project in DB by githubRepo or repoUrl
    const project = await prisma.project.findFirst({
      where: {
        OR: [
          { githubRepo: repoFullName },
          { repoUrl: { contains: repoFullName } },
        ],
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

    if (!project) {
      logger.info(`No project registered for repository: ${repoFullName}`);
      return res.status(200).json({ success: true, message: "No matching project found" });
    }

    const allTasks = project.phases.flatMap((p) => p.milestones.flatMap((m) => m.tasks));
    const updatedTaskIds = new Set();

    // Case 1: Push Event (Commits)
    if (event === "push" && payload.commits && Array.isArray(payload.commits)) {
      for (const commit of payload.commits) {
        const commitMsg = commit.message.toLowerCase();
        const sha = commit.id;

        for (const task of allTasks) {
          // Match by explicit task ID or keywords in commit message
          const matchesId = commitMsg.includes(task.id.toLowerCase());
          const matchesTitle = task.title.length > 5 && commitMsg.includes(task.title.toLowerCase());

          if ((matchesId || matchesTitle) && !task.done) {
            await prisma.task.update({
              where: { id: task.id },
              data: {
                done: true,
                commitSha: sha,
              },
            });
            updatedTaskIds.add({ taskId: task.id, milestoneId: task.milestoneId });
            logger.success(`Auto-completed Task '${task.title}' via commit ${sha}`);
          }
        }
      }
    }

    // Case 2: Pull Request Event (Merged PR)
    if (event === "pull_request" && payload.action === "closed" && payload.pull_request?.merged) {
      const prTitle = (payload.pull_request.title || "").toLowerCase();
      const prBody = (payload.pull_request.body || "").toLowerCase();
      const prText = `${prTitle} ${prBody}`;

      for (const task of allTasks) {
        if (prText.includes(task.id.toLowerCase()) && !task.done) {
          await prisma.task.update({
            where: { id: task.id },
            data: { done: true },
          });
          updatedTaskIds.add({ taskId: task.id, milestoneId: task.milestoneId });
          logger.success(`Auto-completed Task '${task.title}' via merged PR #${payload.pull_request.number}`);
        }
      }
    }

    // Recalculate milestone & phase progress for all affected milestones
    for (const { milestoneId } of updatedTaskIds) {
      await recalculateProgress(milestoneId);
    }

    res.status(200).json({
      success: true,
      message: `Processed webhook for ${repoFullName}`,
      completedTasksCount: updatedTaskIds.size,
    });
  } catch (error) {
    logger.error(`Error handling GitHub Webhook: ${error.message}`);
    res.status(500).json({
      success: false,
      message: "Error processing GitHub webhook",
      error: error.message,
    });
  }
};
