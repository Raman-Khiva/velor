import "dotenv/config"
import express from "express"
import logger from "./utils/logger.js"
import { clerkMiddleware } from "@clerk/express"
import cors from "cors"
import userRouter from "./routes/user.route.js"
import clerkAuth from "./middlewares/auth.middleware.js"
import testRouter from "./routes/test.route.js"
import projectsRouter from "./routes/projects.route.js"
import queriesRouter from "./routes/queries.route.js"
const PORT = process.env.PORT || 4000
const app = express()

app.use(
  cors({
    origin: "*",
  })
)
app.use(express.json())

app.use("/api/user", clerkAuth, userRouter)
app.use("/api/test", testRouter)
app.use("/api/queries", queriesRouter)
app.use("/api/projects", clerkAuth, projectsRouter)
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "server connection sucessfull",
    health: "100%",
  })
})
app.use((req, res) => {
  res
    .status(404)
    .json({ sucess: false, message: "Route not found", error: "Not Found" })
})

app.use((err, req, res, next) => {
  logger.error(`Error: ${err.message}`)
  res
    .status(err.status || 500)
    .json({ error: err.message || "Internal server error" })
})

const server = app.listen(PORT, "0.0.0.0", (err) => {
  if (err) {
    logger.error(`Failed to start API on port ${PORT}: ${err.message}`)
    process.exit(1)
  }
  logger.info(`DATABASE_URL = ${process.env.DATABASE_URL}`)
  logger.success(`API is running on port ${PORT}`)
})

process.on("SIGTERM", () => {
  logger.info("SIGTERM received, shutting down gracefully...")
  server.close(() => {
    logger.success("Server closed")
    process.exit(0)
  })
})

process.on("SIGINT", () => {
  logger.info("SIGINT received, shutting down gracefully...")
  server.close(() => {
    logger.success("Server closed")
    process.exit(0)
  })
})
