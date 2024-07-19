import { Router } from "express";
import { allUsers, getUser } from "../controllers/login";

const router = Router();
router.post("/", getUser);
router.get("/", allUsers);
export default router;
