import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const updatePic = async (req: Request, res: Response) => {
  const { userId, img } = req.body;

  try {
    const updatedPic = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        image: img,
      },
    });

    res.json(updatedPic);
  } catch (err) {
    res.status(500).json({
      message: "An error occurred while updating the user image",
    });
  }
};

export const updateDetails = async (req: Request, res: Response) => {
  const { userId, name, email, mobile, roomId } = req.body;
  try {
    const getRoomsId = await prisma.room.findUnique({
      where: {
        id: roomId,
      },
    });
    if (!getRoomsId?.id) {
      res.json({ message: "room didnt exist" });
      return;
    }
    const updateUserDetails = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name: name,
        email: email,
        mobile: mobile,
        roomId: roomId,
      },
    });
    res.json(updateUserDetails);
  } catch (err) {
    res.json({ message: "details not updated" });
  }
};
