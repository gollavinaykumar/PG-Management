import { Router } from "express";
import { createRoom } from "../controllers/addRoom";


const router = Router();
router.post("/",createRoom);
export default router;