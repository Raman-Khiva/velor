import express from "express";
import { postTest } from "../controllers/test.controller.js";

const testRouter = express.Router();

testRouter.post("/", postTest);

export default testRouter;
