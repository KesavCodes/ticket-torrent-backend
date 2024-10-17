import { Request, Response } from "express";
import prisma from "../lib/clients";

export const getAllTickets = async (req: Request, res: Response) => {
  try {
    const events = await prisma.ticket.findMany({ take: 10 });
    return res
      .status(200)
      .json({ data: events, message: "Tickets retrieved successfully!" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      data: null,
      message: "Something went wrong. Failed to retrieve tickets!",
    });
  }
};

export const getTicketById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const event = await prisma.ticket.findUnique({ where: { id } });
    return res.json({ data: event, message: "Ticket retrieved successfully!" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      data: null,
      message: "Something went wrong. Failed to retrieve ticket!",
    });
  }
};

export const addTicket = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (!userId)
    return res.status(401).json({
      data: null,
      message: "User need to be authorized to add tickets.",
    });
  const { eventId, price, quantity, status, category } = req.body;
  try {
    const newTicket = await prisma.ticket.create({
      data: {
        userId,
        eventId,
        price,
        quantity,
        status,
        category,
      },
    });
    return res
      .status(201)
      .json({ data: newTicket, message: "Ticket added successfully!" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      data: null,
      message: "Something went wrong. Failed to add Ticket!",
    });
  }
};

export const updateTicket = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (!userId)
    return res.status(401).json({
      data: null,
      message: "User need to be authorized to update tickets.",
    });
  const { eventId, price, quantity, status, category } = req.body;
  const { id } = req.params;
  try {
    const updatedEvent = await prisma.ticket.update({
      where: { id },
      data: {
        userId,
        eventId,
        price,
        quantity,
        status,
        category,
      },
    });
    return res.status(200).json({
      data: updatedEvent,
      message: "Ticket data updated successfully!",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      data: null,
      message: "Something went wrong. Failed to update Ticket!",
    });
  }
};

export const deleteTicket = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedEvent = await prisma.ticket.delete({ where: { id } });
    return res
      .status(200)
      .json({ data: deletedEvent, message: "Ticket deleted successfully!" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      data: null,
      message: "Something went wrong. Failed to delete ticket!",
    });
  }
};
