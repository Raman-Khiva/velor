import logger from "../utils/logger.js";
import prisma from "../config/prisma.ts";

export const syncUser = async (req, res) => {
  logger.enter("Sync User Controller");
  try {
    const auth = req.auth();
    logger.info(`Received auth() object: ${JSON.stringify(auth)}`);
    const clerkId = auth.userId;
    logger.info(`Clerk ID: ${clerkId}`);
    let user = await prisma.user.findUnique({
      where: {
        clerkId: clerkId,
      },
    });

    if (!user) {
      logger.info(`Creating new user with clerkId: ${clerkId}`);
      user = await prisma.user.create({
        data: { clerkId: clerkId },
      });
      logger.success(`User created successfully`);
    } else {
      logger.info(`User found in database`);
    }
    logger.success("User synced successfully");
    res.json({
      status: "success",
      message: "User synced successfully",
      data: {
        user: user,
      },
    });
  } catch (error) {
    logger.error(`Failed to sync user: ${error.message}`);
    res.json({
      status: "error",
      message: "Failed to sync user",
      error: error.message,
    });
  }
};
