import prisma from "../config/prisma.js";
import logger from "../utils/logger.js";

export const postTest = async (req, res) => {
  logger.enter("Post Test Controller");
  try {
    const { test } = req.body;
    logger.info(`Received test: ${JSON.stringify(test)}`);
    const postedTest = await prisma.test.create({
      data: test,
    });
    res.status(201).json({
      success: true,
      message: "Test posted successfully",
      data: { postedTest: postedTest },
    });
  } catch (error) {
    logger.error(`Error while posting test on db. ERROR: ${error.message}`);
    res.status(500).json({
      success: false,
      message: "Failed to post test on db",
      error: error.message,
    });
  }
};
