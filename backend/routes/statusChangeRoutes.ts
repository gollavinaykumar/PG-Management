import { Router } from "express";
import { getissue, statusChange } from "../controllers/statusChange";

const router = Router();

router.post("/", statusChange);
router.patch("/",getissue);
export default router;
