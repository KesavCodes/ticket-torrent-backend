import express from "express";
import {
  addRequest,
  deleteRequest,
  getAllRequests,
  getRequestById,
  updateRequest,
} from "../controllers/request.controller";

const router = express.Router();

router.get("/", getAllRequests);
router.get("/:id", getRequestById);

router.post("/", addRequest);

router.put("/:id", updateRequest);

router.delete("/:id", deleteRequest);

export default router;
