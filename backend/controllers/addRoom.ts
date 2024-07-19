import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const createRoom = async (req: Request, res: Response) => {
  const { roomno, capacity, price } = req.body;

  try {
    const checkRoom = await prisma.room.findFirst({
      where: {
        roomno: roomno,
      },
    });

    if (checkRoom) {
      return res.status(409).json({ message: "Room already added" });
    }

    const createdRoom = await prisma.room.create({
      data: {
        roomno,
        capacity,
        price,
      },
    });

    res.status(201).json(createdRoom);
  } catch (err) {
    res.status(500).json({ message: "Failed to create room", error: err });
  }
};
