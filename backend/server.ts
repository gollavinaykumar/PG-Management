import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import addRoomRoutes from "./routes/addRoomRoutes";
import createUserRoutes from "./routes/signUpRoutes";
import loginRoutes from "./routes/loginRoutes";
import getAllRoomRoutes from "./routes/getAllRoomsRouts";
import updatePicRoutes from "./routes/updatePicRoutes";
import IssueCreateRoutes from "./routes/IssueRoutes";
import AdminIssuesRoutes from "./routes/AdminIssuesRoutes";
import statuschangeRoutes from "./routes/statusChangeRoutes";
const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

app.use("/newroom", addRoomRoutes);
app.use("/signup", createUserRoutes);
app.use("/signin", loginRoutes);
app.use("/", getAllRoomRoutes);
app.use("/profile", updatePicRoutes);
app.use("/:roomid/Issues", IssueCreateRoutes);
app.use("/dashboard/Issues", AdminIssuesRoutes);
app.use("/dashboard/Issues/:issueid", statuschangeRoutes);
app.listen(PORT, () => {
  console.log(`server is runing on the port ${PORT}`);
});
