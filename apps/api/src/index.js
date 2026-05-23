import "dotenv/config"
import express from "express"
import logger from "./utils/logger.js"
import prisma from "@workspace/db"

import cors from "cors"
// import userRouter from "./routes/user.route.js"
// import clerkAuth from "./middlewares/auth.middleware.js"
// import testRouter from "./routes/test.route.js"
// import projectsRouter from "./routes/projects.route.js"
// import queriesRouter from "./routes/queries.route.js"
const PORT = process.env.PORT || 4000
const app = express()
app.use(express.json())

app.use(
  cors({
    origin: "*",
  })
)

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "server connection sucessfull",
    health: "100%",
  })
})

app.post("/api/test", async (req, res) => {
  try {
    const { test } = req.body
    logger.info("test data", test)
    const result = await prisma.test.create({
      data: test,
    })

    logger.info("test created here is the result", JSON.stringify(result))
    res.status(201).json({
      success: true,
      message: "test created sucessfully",
    })
  } catch (error) {
    console.error("Error creating test:", error)
    console.error("Eroro Message:", error.message)
    res.status(500).json({
      scucess: false,
      error: error,
      message: error.message,
    })
  }
})


app.post("/api/note", async (req, res) => {
  try {
    const { note } = await req.body;
    logger.info(`note data ${JSON.stringify(note)}`)
    const result = await prisma.note.create({
      data: { note },
    })

    logger.info("note created here is the result", JSON.stringify(result))
    res.status(201).json({
      success: true,
      message: "note created sucessfully",
      result: result
    })
  } catch (error) {
    console.error("Error creating note:", error)
    console.error("Eroro Message:", error.message)
    res.status(500).json({
      scucess: false,
      error: error,
      message: error.message,
    })
  }
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
  //logger.info(`this is arr entry ${arr[0]}`)
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
