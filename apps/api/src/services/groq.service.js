import Groq from "groq-sdk";
import logger from "../utils/logger.js";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const groqQuery = async (req, res) => {
  logger.enter("Groq Query");
  try {
    const { queries } = req.body;
    const query = queries.query;
    logger.info(`User query: ${query}`);
    const result = await groq.chat.completions.create({
      model: "openai/gpt-oss-120b",
      messages: [{ role: "user", content: query }],
    });
    const answer = result.choices[0]?.message?.content || "No answer found";
    logger.success(`Groq respnseded successfully`);
    logger.info(`Groq response: ${answer}`);
    res.status(200).json({
      success: true,
      message: "Groq query executed successfully",
      answer,
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
