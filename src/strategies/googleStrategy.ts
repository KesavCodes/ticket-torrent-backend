import passport from "passport";
import { Profile, Strategy } from "passport-google-oauth20";
import prisma from "../lib/clients";

export default passport.use(
  new Strategy(
    {
      clientID: process.env.CLIENT_ID!,
      clientSecret: process.env.CLIENT_SECRET!,
      callbackURL: "http://localhost:8080/auth/google/callback",
      scope: ["email"],
    },
    async (accessToken, refreshToken, profile: Profile, done) => {
      console.log("Profile : ", profile);
      try {
        const findUser = await prisma.user.findUnique({
          where: { oauthId: profile.id, email: profile._json.email! },
        });
        if (!findUser) {
          const newUser = await prisma.user.create({
            data: {
              oauthId: profile.id,
              oauthProvider: "google",
              username: profile._json.email!,
              email: profile._json.email!,
              name: profile.displayName,
              avatar: profile._json.picture,
            },
          });
          return done(null, newUser);
        }
        return done(null, findUser);
      } catch (err) {
        return done(err, undefined);
      }
    }
  )
);
