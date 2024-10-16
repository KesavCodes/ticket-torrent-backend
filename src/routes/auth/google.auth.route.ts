import express, { Request, Response } from "express";
import passport from "passport";
import "../../strategies/googleStrategy";

const router = express.Router();

router.get("/login", passport.authenticate("google"));

router.get(
  "/callback",
  passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/failure",
    session: true,
  })
);

router.get("/failure", (req: Request, res: Response) => {
  return res.status(400).send("Login failed. Try again!");
});

export default router;
