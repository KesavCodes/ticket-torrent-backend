import { Request, Response } from "express";
import prisma from "../lib/clients";

export const loadDataToDb = async (req: Request, res: Response) => {
  const data = req.body;
  console.log("--in load data to db");
  try {
    const addEvents = await prisma.event.createMany({
      data,
    });
    return res
      .status(201)
      .json({ data: addEvents, message: "Events added successfully!" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      data: null,
      message: "Something went wrong. Failed to add Events!",
    });
  }
};
