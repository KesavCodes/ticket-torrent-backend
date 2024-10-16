import express from "express";
import { loadDataToDb } from "../controllers/dataLoad.controller";

const router = express.Router();

router.post("/", loadDataToDb);

export default router;
