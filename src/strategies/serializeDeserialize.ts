import passport from "passport";
import prisma from "../lib/clients";

passport.serializeUser((user, done) => {
  console.log(user, "---> Inside serialize user");
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  console.log(id, "---> Inside deserialize user");
  try {
    const findUser = await prisma.user.findUnique({ where: { id } });
    if (!findUser) throw new Error(`User ${id} not found`);
    const { password: removePassword, ...userData } = findUser;
    return done(null, userData);
  } catch (err) {
    console.error(err);
    return done(err, null);
  }
});
