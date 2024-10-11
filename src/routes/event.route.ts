import express from "express";
import {
  addEvent,
  deleteEvent,
  getAllEvents,
  getEventById,
  getEventsBySearch,
  updateEvent,
} from "../controllers/event.controller";

const router = express.Router();

router.get("/", getAllEvents);
router.get("/id/:eventId", getEventById);
router.get("/search", getEventsBySearch);

router.post("/", addEvent);

router.put("/:id", updateEvent);

router.delete("/:id", deleteEvent);

export default router;
