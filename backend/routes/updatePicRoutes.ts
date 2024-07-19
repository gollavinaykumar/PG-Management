import { Router } from "express";
import { updateDetails, updatePic } from "../controllers/updatePic";

const router = Router();
router.post("/", updatePic);
router.patch("/",updateDetails)
export default router;
