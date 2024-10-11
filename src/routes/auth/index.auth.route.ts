import express from "express";

import localRouter from "./local.auth.route";
import googleRouter from "./google.auth.route";

import "../../strategies/serializeDeserialize";

const router = express.Router();

router.use("/local", localRouter);
router.use("/google", googleRouter);

export default router;
