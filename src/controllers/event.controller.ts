import { Request, Response } from "express";
import prisma from "../lib/clients";
import { Event, Ticket } from "@prisma/client";

type EventRequiredFields = {
  name: string;
  id: string;
  description: string;
  cover: string;
  date: Date;
  city: {
    id: string;
    name: string;
  };
  address: string;
  category: string;
  hostedBy: string;
  tags: string[];
};

type EventWithTickets = Event & {
  tickets: Ticket[];
};

const likedEventsSet = async (
  events: EventRequiredFields[] | EventWithTickets,
  user?: Express.User
) => {
  let likedEvents: { eventId: string }[] = [];
  if (user) {
    likedEvents = await prisma.like.findMany({
      where: {
        userId: user.id,
        eventId: Array.isArray(events)
          ? { in: events.map((event) => event.id) }
          : events.id,
      },
      select: {
        eventId: true,
      },
    });
  }
  console.log(likedEvents, "---liked set");
  return new Set(likedEvents.map((item) => item.eventId));
};

export const getAllEvents = async (req: Request, res: Response) => {
  try {
    let events = await prisma.event.findMany({
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
        tags: true,
      },
    });
    const likedSet = await likedEventsSet(events, req.user);
    events = events.map((event) => ({
      ...event,
      favorite: likedSet.has(event.id),
    }));
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
    let event = await prisma.event.findUnique({
      where: { id },
      include: { tickets: true },
    });
    if (!event)
      return res.status(404).json({
        data: null,
        message: "Not able to find the event!",
      });
    const likedSet = await likedEventsSet(event, req.user);
    let eventWithFav = { ...event, favorite: likedSet.has(event.id) };

    return res.json({
      data: eventWithFav,
      message: "Events retrieved successfully!",
    });
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
    let eventsMatchingSearchCriteria = await prisma.event.findMany({
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
        tags: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      ...(max && typeof Number(max) === "number" ? { take: Number(max) } : {}),
    });

    const likedSet = await likedEventsSet(
      eventsMatchingSearchCriteria,
      req.user
    );
    eventsMatchingSearchCriteria = eventsMatchingSearchCriteria.map(
      (event) => ({
        ...event,
        favorite: likedSet.has(event.id),
      })
    );

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
  const {
    name,
    description,
    date,
    cityId,
    address,
    hostedBy,
    category,
    tags,
    cover,
  } = req.body;
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
        address,
        hostedBy,
        category,
        cover,
        tags,
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
  if (!userId)
    return res
      .status(401)
      .json({ data: null, message: "User not authenticated." });
  try {
    const checkEvent = await prisma.event.findUnique({ where: { id, userId } });
    if (!checkEvent)
      return res
        .status(401)
        .json({ data: null, message: "Event not belong to the user." });
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
