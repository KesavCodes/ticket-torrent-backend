import express, { Request, Response } from "express";
import passport from "passport";
import "../../strategies/googleStrategy";

const router = express.Router();

router.get("/login", passport.authenticate("google"));

router.get(
  "/callback",
  passport.authenticate("google", {
    successRedirect: "success",
    failureRedirect: "failure",
    session: true,
  })
);

router.get("/success", (req: Request, res: Response) => {
  console.log(req.user, "-- From: req.user");
  return res
    .status(200)
    .json({ message: "User Logged in successfully", user: req.user?.id });
});

router.get("/failure", (req: Request, res: Response) => {
  return res.status(400).send("Login failed. Try again!");
});

export default router;
