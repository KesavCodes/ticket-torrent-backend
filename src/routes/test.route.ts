import express, { Request, Response } from "express";

const router = express.Router();

router.get("/setCookie", (req: Request, res: Response) => {
  return res
    .cookie("hello", "world", {
      maxAge: 1000 * 60 * 15,
      signed: true,
    })
    .sendStatus(200);
});

router.get("/getCookie", (req: Request, res: Response) => {
  console.log(req.cookies);
  console.log(req.signedCookies);
  return res.sendStatus(200);
});

router.get("/saveSession", (req: Request, res: Response) => {
  console.log("Saving session with Id: " + req.session?.id);
  req.session.user = { id: "testUserId" };
  return res.sendStatus(200);
});

router.get("/getSession", (req: Request, res: Response) => {
  console.log(req.session?.id, "--> Session ID");
  console.log(req.session, "--> Session data");
  return req.session && req.session.id
    ? res.sendStatus(200)
    : res.sendStatus(404);
});

export default router;
