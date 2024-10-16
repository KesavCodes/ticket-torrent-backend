import { Request, Response } from "express";
import prisma from "../../lib/clients";
import { validationResult } from "express-validator";

import { hashPassword } from "../../lib/hashHelper";

export const localRegisterUser = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array().map((err,index)=>`${index+1}. ${err.msg}`) });
  }
  const { username, password, email } = req.body;
  try {
    const existingUser = await prisma.user.findUnique({
      where: { username: username },
    });
    if (existingUser) throw new Error("Username already in use");
    const hashedPassword = hashPassword(password);
    const { password: removePassword, ...newUser } = await prisma.user.create({
      data: { username, email, password: hashedPassword },
    });
    return res
      .status(201)
      .json({ message: "User registered successfully", data: newUser });
  } catch (err) {
    console.error(err);
    if (err instanceof Error) {
      return res.status(400).json({ message: err.message });
    }
    return res
      .status(500)
      .json({ message: "Something went wrong. Failed to register user!" });
  }
};

export const localLogin = (req: Request, res: Response) => {
  console.log(req.user, "-- From: req.user");
  return res.status(200).json({ message: "User Logged in successfully" });
};
