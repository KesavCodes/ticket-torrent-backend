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

router.post("/logout", (req: Request, res: Response) => {
  req.logout((err) => {
    if (err)
      return res
        .status(500)
        .json({ message: "Something went wrong. Failed to logout user" });
    return res.status(200).json({ message: "User logged out successfully" });
  });
});

export default router;
