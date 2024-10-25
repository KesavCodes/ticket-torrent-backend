import express from "express";
import {
  deleteUser,
  getAllUsers,
  getMyProfileDetail,
  getUserById,
} from "../controllers/user.controller";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/me", getMyProfileDetail);
router.get("/:id", getUserById);

router.delete("/:id", deleteUser);

export default router;
