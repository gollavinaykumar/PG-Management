import { Router } from "express";
import { allRooms} from "../controllers/getRooms";

const router = Router();
router.get("/", allRooms);
export default router;
