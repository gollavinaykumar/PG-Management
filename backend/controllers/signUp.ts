import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, name, password, mobile, roomId } = req.body;
  let hashedPassword = await bcrypt.hash(password, 10);

  try {
    const checkRoomAvailability = await prisma.room.findUnique({
      where: {
        id: roomId,
      },
    });

    if (!checkRoomAvailability) {
      res.status(404).json({ message: "Room not found" });
      return;
    }

    const checkroom = await prisma.user.findMany({
      where: {
        roomId: roomId,
      },
    });

    if (checkroom.length >= checkRoomAvailability.capacity) {
      res.status(400).json({ message: "Room capacity is full" });
      return;
    }

    const createdUser = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        mobile: mobile,
        room: {
          connect: { id: roomId },
        },
      },
    });

    res.json(createdUser);
  } catch (error) {
    res.status(400).json({ message: "Failed to create user", error });
  }
};
