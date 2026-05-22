import { clerkMiddleware } from "@clerk/express";

const clerkAuth = clerkMiddleware();

export default clerkAuth;
