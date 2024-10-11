import passport from "passport";
import { Strategy } from "passport-local";
import prisma from "../lib/clients";
import { comparePassword } from "../lib/hashHelper";

export default passport.use(
  new Strategy(async (username, password, done) => {
    console.log(username, "--> username");
    console.log(password, "--> password");
    try {
      const findUser = await prisma.user.findUnique({ where: { username } });
      if (!findUser || !comparePassword(password, findUser.password!))
        throw new Error("Invalid credentials!");
      const { password: removePassword, ...userData } = findUser;
      return done(null, userData);
    } catch (err) {
      console.log(err);
      return done(err, undefined);
    }
  })
);
