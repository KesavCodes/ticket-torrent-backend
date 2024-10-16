import express from "express";
import passport from "passport";
import "../../strategies/localStrategy";

import { localLogin, localRegisterUser } from "../../controllers/auth/local.auth.controller";

import userValidationSchema from "../../validations/user.validation";

const router = express.Router();

router.post("/register", userValidationSchema, localRegisterUser);

router.post("/login", passport.authenticate("local"), localLogin);


export default router;
