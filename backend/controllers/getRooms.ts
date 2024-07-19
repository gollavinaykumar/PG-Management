import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();

export const allRooms = async (req: Request, res: Response) => {
  try {
    const getAllRooms = await prisma.room.findMany();
    res.json(getAllRooms);
  } catch (err) {
    res.status(400).json({ message: "Failed to fetch rooms", err });
  }
};


