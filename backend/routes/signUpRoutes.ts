import { Router } from "express";
import { createUser } from "../controllers/signUp";

const router = Router();
router.post("/", createUser);
export default router;
