import express from "express";
import {
  updateLikeStatus,
} from "../controllers/like.controller";

const router = express.Router();


router.put("/:id", updateLikeStatus);


export default router;
