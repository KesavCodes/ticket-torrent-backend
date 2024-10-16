import { Request, Response } from "express";
import prisma from "../lib/clients";

export const getAllEvents = async (req: Request, res: Response) => {
  try {
    const events = await prisma.event.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        cover: true,
        city: true,
        date: true,
      },
    });
    return res
      .status(200)
      .json({ data: events, message: "Events retrieved successfully!" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      data: null,
      message: "Something went wrong. Failed to retrieve events!",
    });
  }
};

export const getEventById = async (req: Request, res: Response) => {
  const { eventId: id } = req.params;
  try {
    const event = await prisma.event.findUnique({ where: { id } });
    return res.json({ data: event, message: "Events retrieved successfully!" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      data: null,
      message: "Something went wrong. Failed to retrieve event!",
    });
  }
};

export const getEventsBySearch = async (req: Request, res: Response) => {
  try {
    const { name, city, date, max } = req.query;
    const lowerDateRange = date
      ? new Date(new Date(date.toString()).setUTCHours(0, 0, 0, 0))
      : undefined;
    const upperDateRange = date
      ? new Date(new Date(date.toString()).setUTCHours(23, 59, 59, 999))
      : undefined;
    const eventsMatchingSearchCriteria = await prisma.event.findMany({
      where: {
        name: {
          contains: name ? name.toString() : undefined,
          mode: "insensitive",
        },
        city: {
          name: {
            contains: city ? city.toString() : undefined,
            mode: "insensitive",
          },
        },
        date: {
          gte: lowerDateRange,
          lte: upperDateRange,
        },
      },
      select: {
        id: true,
        name: true,
        description: true,
        cover: true,
        city: true,
        date: true,
        address: true,
        category: true,
        hostedBy: true,
        tags: true
      },
      orderBy: {
        createdAt: "desc",
      },
      ...(max && typeof Number(max) === "number" ? { take: Number(max) } : {}),
    });

    return res.json({
      data: eventsMatchingSearchCriteria,
      message: "Events retrieved successfully!",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      data: null,
      message: "Something went wrong. Failed to retrieve events!",
    });
  }
};

export const addEvent = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (!userId)
    return res.status(401).json({
      data: null,
      message: "User need to be authorized to add events.",
    });
  const {
    name,
    description,
    date,
    cover,
    cityId,
    address,
    category,
    hostedBy,
    tags,
  } = req.body;
  try {
    const newEvent = await prisma.event.create({
      data: {
        userId,
        name,
        description,
        cover,
        date: new Date(date),
        dateTime: new Date(date),
        cityId,
        address,
        category,
        hostedBy,
        tags,
      },
    });
    return res
      .status(201)
      .json({ data: newEvent, message: "Event added successfully!" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      data: null,
      message: "Something went wrong. Failed to add event!",
    });
  }
};

export const updateEvent = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const { name, description, date, cityId } = req.body;
  const { id } = req.params;
  try {
    const checkEvent = await prisma.event.findUnique({ where: { id, userId } });
    if (!checkEvent)
      return res.status(401).json({ message: "Event not belong to the user." });
    const updatedEvent = await prisma.event.update({
      where: { id },
      data: {
        userId,
        name,
        description,
        date: new Date(date),
        dateTime: new Date(date),
        cityId,
      },
    });
    return res.status(200).json({
      data: updatedEvent,
      message: "Event data updated successfully!",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      data: null,
      message: "Something went wrong. Failed to update Event!",
    });
  }
};

export const deleteEvent = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const { id } = req.params;
  try {
    const checkEvent = await prisma.event.findUnique({ where: { id, userId } });
    if (!checkEvent)
      return res.status(401).json({ message: "Event not belong to the user." });
    const deletedEvent = await prisma.event.delete({ where: { id } });
    return res
      .status(200)
      .json({ data: deletedEvent, message: "Event deleted successfully!" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      data: null,
      message: "Something went wrong. Failed to delete event!",
    });
  }
};
