"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const clients_1 = __importDefault(require("../lib/clients"));
exports.default = passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:8080/auth/google/callback",
    scope: ["email"],
}, (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Profile : ", profile);
    try {
        const findUser = yield clients_1.default.user.findUnique({
            where: { oauthId: profile.id, email: profile._json.email },
        });
        if (!findUser) {
            const newUser = yield clients_1.default.user.create({
                data: {
                    oauthId: profile.id,
                    oauthProvider: "google",
                    username: profile._json.email,
                    email: profile._json.email,
                    name: profile.displayName,
                    avatar: profile._json.picture,
                },
            });
            return done(null, newUser);
        }
        return done(null, findUser);
    }
    catch (err) {
        return done(err, undefined);
    }
})));
//# sourceMappingURL=googleStrategy.js.map