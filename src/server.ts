import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import expressSession from "express-session";
import passport from "passport";
import dotenv from "dotenv";

import testRouter from "./routes/test.route";

import authRouter from "./routes/auth/index.auth.route";

import eventsRouter from "./routes/event.route";
import cityRouter from "./routes/city.route";
import userRouter from "./routes/user.route";
import ticketRouter from "./routes/ticket.route";
import requestRouter from "./routes/request.route";

dotenv.config();

type User = {
  id: string;
};

declare global {
  namespace Express {
    interface User {
      id: string;
    }
  }
}

// Augment express-session with a custom SessionData object
declare module "express-session" {
  interface SessionData {
    user: User;
  }
}

const app = express();
const PORT = process.env.PORT || 8080;

app.use(
  cors({
    // origin: "http://localhost:3000",
    credentials: true, // Enables cookies for CORS
  })
);
app.use(express.json());
app.use(cookieParser("cookieSecretCode"));
app.use(
  expressSession({
    secret: "sessionSecretCode",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/test", testRouter);

app.use("/auth", authRouter);

app.use("/events", eventsRouter);
app.use("/city", cityRouter);
app.use("/user", userRouter);
app.use("/ticket", ticketRouter);
app.use("/request", requestRouter);

app.get("/", (req: Request, res: Response) =>
  res.status(200).send("Welcome to Ticket Torrent Backend!")
);

app.listen(PORT, () => console.log(`listening on PORT: ${PORT}`));
