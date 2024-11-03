import { Request, Response } from "express";
import prisma from "../lib/clients";

export const updateLikeStatus = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const { id: eventId } = req.params;
  if (!userId || !eventId)
    return res.status(400).json({
      data: null,
      message: "User not authenticated or eventId not matching!",
    });
  try {
    let userInteractionWithPost = await prisma.like.findFirst({
      where: { userId, eventId },
      select: {
        id: true,
      },
    });
    if (userInteractionWithPost) {
      await prisma.like.delete({ where: { id: userInteractionWithPost.id } });
    } else {
      await prisma.like.create({
        data: {
          userId,
          eventId,
        },
      });
    }
    return res.status(200).json({
      data: null,
      message: "User interaction status updated successfully!",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      data: null,
      message: "Something went wrong. Failed to update Request!",
    });
  }
};
