import Groq from "groq-sdk";
import logger from "../utils/logger.js";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const groqQuery = async (req, res) => {
  logger.enter("Groq Query");
  try {
    const query = req.body?.query || req.body?.queries?.query;
    if (!query) {
      return res.status(400).json({
        success: false,
        message: "Query field is required",
        error: "MISSING_QUERY",
      });
    }
    logger.info(`User query: ${query}`);
    const result = await groq.chat.completions.create({
      model: "openai/gpt-oss-120b",
      messages: [{ role: "user", content: query }],
    });
    const answer = result.choices[0]?.message?.content || "No answer found";
    logger.success(`Groq responded successfully`);
    logger.info(`Groq response: ${answer}`);
    res.status(200).json({
      success: true,
      message: "Groq query executed successfully",
      data: { answer },
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({
      success: false,
      message: "Error executing Groq query",
      error: error.message,
    });
  }
};
