import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const statusChange = async (req: Request, res: Response) => {
  const { issueId, status } = req.body;

  try {
    const statusChanged = await prisma.issues.update({
      where: {
        id: issueId,
      },
      data: {
        status,
      },
    });
    res.status(200).json(statusChanged);
  } catch (err) {
    res.status(500).json({ message: "Failed to create room", error: err });
  }
};

export const getissue = async (req: Request, res: Response) => {
  const { issueId } = req.body;

  try {
    const gettedIssues = await prisma.issues.findMany({
      where: {
        id: issueId,
      },
    });
    res.status(200).json(gettedIssues);
  } catch (err) {
    res.status(500).json({ message: "Failed to create room", error: err });
  }
};
