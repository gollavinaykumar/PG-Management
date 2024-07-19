import { Request, Response } from "express";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getIssues = async (req: Request, res: Response) => {
  try {
    const gettedIssues = await prisma.issues.findMany();
    if (!gettedIssues) {
      return;
    }
    res.status(200).json(gettedIssues);
  } catch (e) {
    res.status(400).json({ message: "failed" });
  }
};
