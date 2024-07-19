import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createIssue = async (req: Request, res: Response) => {
  const { roomId, Issue } = req.body;
  try {
    const createdIssue = await prisma.issues.create({
      data: {
        message: Issue,
        room: {
          connect: {
            id: roomId,
          },
        },
      },
    });
    res.json(createdIssue);
  } catch (e) {
    res.status(400).json({ message: "Failed to create Issue", e });
  }
};

export const getIssues = async (req: Request, res: Response) => {
  const { roomId } = req.body;
  try {
    const gettedIssues = await prisma.issues.findMany({
      where: {
        roomId: roomId,
      },
    });
    res.json(gettedIssues);
  } catch (e) {
    res.status(400).json({ message: "failed to fetch Issues" });
  }
};
