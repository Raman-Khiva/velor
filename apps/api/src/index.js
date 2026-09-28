import "dotenv/config"
import express from "express"
import fs from "fs"
import path from "path"
import YAML from "yaml"
import swaggerUi from "swagger-ui-express"
import logger from "./utils/logger.js"
import { clerkMiddleware } from "@clerk/express"
import cors from "cors"
import userRouter from "./routes/user.route.js"
import clerkAuth from "./middlewares/auth.middleware.js"
import testRouter from "./routes/test.route.js"
import projectsRouter from "./routes/projects.route.js"
import queriesRouter from "./routes/queries.route.js"
import webhooksRouter from "./routes/webhooks.route.js"

const PORT = process.env.PORT || 4000
const app = express()

app.use(
  cors({
    origin: "*",
  })
)
app.use(express.json())

// Load OpenAPI Specification
const openapiPath = path.resolve(process.cwd(), "openapi.yaml")
let openapiDocument = {}
if (fs.existsSync(openapiPath)) {
  const openapiYamlText = fs.readFileSync(openapiPath, "utf8")
  openapiDocument = YAML.parse(openapiYamlText)
}

// Serve OpenAPI Docs and Endpoints
app.use("/docs", swaggerUi.serve, swaggerUi.setup(openapiDocument))
app.get("/openapi.json", (req, res) => {
  res.json(openapiDocument)
})
app.get("/openapi.yaml", (req, res) => {
  res.sendFile(openapiPath)
})

app.use("/api/user", clerkAuth, userRouter)
app.use("/api/test", testRouter)
app.use("/api/queries", queriesRouter)
app.use("/api/projects", clerkAuth, projectsRouter)
app.use("/api/webhooks", webhooksRouter)

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server connection successful",
    data: {
      health: "100%",
    },
  })
})

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    error: "NOT_FOUND",
  })
})

app.use((err, req, res, next) => {
  logger.error(`Error: ${err.message}`)
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error",
    error: err.name || "INTERNAL_SERVER_ERROR",
  })
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
