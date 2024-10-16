import express from "express";
import { Request, Response } from "express";

import localRouter from "./local.auth.route";
import googleRouter from "./google.auth.route";

import "../../strategies/serializeDeserialize";

const router = express.Router();

router.use("/local", localRouter);
router.use("/google", googleRouter);

export const logout = (req: Request, res: Response) => {
  if (!req.user)
    return res.status(401).json({ message: "User not authenticated" });
  req.logout((err) => {
    if (err)
      return res
        .status(500)
        .json({ message: "Something went wrong. Failed to logout user" });
    return res.status(200).json({ message: "User logged out successfully" });
  });
};

router.post("/logout", logout)

export default router;
