import express from "express";
import {
  addTicket,
  deleteTicket,
  getAllTickets,
  getTicketById,
  updateTicket,
} from "../controllers/ticket.controller";

const router = express.Router();

router.get("/", getAllTickets);
router.get("/:id", getTicketById);

router.post("/", addTicket);

router.put("/:id", updateTicket);

router.delete("/:id", deleteTicket);

export default router;
