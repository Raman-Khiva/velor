import express from "express";

import { groqQuery } from "../services/groq.service.js";

const queriesRouter = express.Router();

queriesRouter.post("/", groqQuery);

export default queriesRouter;
