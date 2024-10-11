import { Request, Response } from "express";
import prisma from "../lib/clients";

export const getAllRequests = async (req: Request, res: Response) => {
  try {
    const events = await prisma.request.findMany({ take: 10 });
    return res
      .status(200)
      .json({ data: events, message: "Requests retrieved successfully!" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      data: null,
      message: "Something went wrong. Failed to retrieve requests!",
    });
  }
};

export const getRequestById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const request = await prisma.request.findUnique({ where: { id } });
    return res.json({
      data: request,
      message: "Requests retrieved successfully!",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      data: null,
      message: "Something went wrong. Failed to retrieve request!",
    });
  }
};
export const addRequest = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ data: null, message: "User need to be authorized to add requests." });
  const { name, eventUrl, status } = req.body;
  try {
    const newRequest = await prisma.request.create({
      data: {
        userId,
        name,
        eventUrl,
        status,
      },
    });
    return res
      .status(201)
      .json({ data: newRequest, message: "Request added successfully!" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      data: null,
      message: "Something went wrong. Failed to add request!",
    });
  }
};

export const updateRequest = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const { name, eventUrl, status } = req.body;
  const { id } = req.params;
  try {
    const updatedRequest = await prisma.request.update({
      where: { id },
      data: {
        userId,
        name,
        eventUrl,
        status,
      },
    });
    return res.status(200).json({
      data: updatedRequest,
      message: "Request data updated successfully!",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      data: null,
      message: "Something went wrong. Failed to update Request!",
    });
  }
};

export const deleteRequest = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedRequest = await prisma.request.delete({ where: { id } });
    return res
      .status(200)
      .json({ data: deletedRequest, message: "Request deleted successfully!" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      data: null,
      message: "Something went wrong. Failed to delete request!",
    });
  }
};
