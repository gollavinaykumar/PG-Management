import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

export const getUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      res.status(400).json({ message: "User not found" });
      return;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      res.status(400).json({ message: "Invalid email or password" });
      return;
    }

    const updateUser = await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        isloggedIn: true,
      },
    });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const allUsers = async (req: Request, res: Response) => {
  try {
    const gettedUsers = await prisma.user.findMany();
    res.json(gettedUsers);
  } catch (err) {
    res.status(400).json({ message: "Failed to fetch users", err });
  }
};
