import { Router } from "express";
import { createIssue, getIssues } from "../controllers/IssuesCreate";

const router = Router();
router.post("/", createIssue);
router.patch("/", getIssues);
export default router;
