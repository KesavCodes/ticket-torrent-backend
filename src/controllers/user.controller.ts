import { Request, Response } from "express";
import prisma from "../lib/clients";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({ take: 10 });
    return res
      .status(200)
      .json({ data: users, message: "Users retrieved successfully!" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      data: null,
      message: "Something went wrong. Failed to retrieve users!",
    });
  }
};

export const getMyProfileDetail = async (req: Request, res: Response) => {
  const id = req.user?.id;
  if (!id)
    return res.status(401).json({
      data: null,
      message: "User not authenticated.",
    });
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        username: true,
        name: true,
        avatar: true,
        soldTickets: true,
        boughtTickets: true,
        saves: true,
        likes: true,
        requests: true,
        _count: {
          select: {
            followers: true,
            follows: true,
          },
        },
      },
    });
    return res.json({
      data: user,
      message: "User profile data retrieved successfully!",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      data: null,
      message: "Something went wrong. Failed to retrieve user profile data!",
    });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    return res.json({ data: user, message: "User retrieved successfully!" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      data: null,
      message: "Something went wrong. Failed to retrieve user data!",
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const checkUser = await prisma.user.findUnique({ where: { id } });
    if (!checkUser)
      return res.status(400).json({ message: "Something went wrong." });
    const deleteUser = await prisma.user.delete({ where: { id } });
    return res
      .status(200)
      .json({ data: deleteUser, message: "User deleted successfully!" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      data: null,
      message: "Something went wrong. Failed to delete user!",
    });
  }
};
