import express from "express";
import {
  addCity,
  deleteCity,
  getAllCities,
  updateCity,
} from "../controllers/city.controller";

const router = express.Router();

router.get("/", getAllCities);

router.post("/", addCity);

router.put("/:id", updateCity);

router.delete("/:id", deleteCity);

export default router;
