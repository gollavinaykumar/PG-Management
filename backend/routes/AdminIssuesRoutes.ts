import { Router } from "express";
import { getIssues } from "../controllers/AdminIssues";

const router = Router();
router.get("/", getIssues);

export default router;
