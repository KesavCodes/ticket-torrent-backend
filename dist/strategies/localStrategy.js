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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const clients_1 = __importDefault(require("../lib/clients"));
const hashHelper_1 = require("../lib/hashHelper");
exports.default = passport_1.default.use(new passport_local_1.Strategy((username, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(username, "--> username");
    console.log(password, "--> password");
    try {
        const findUser = yield clients_1.default.user.findUnique({ where: { username } });
        if (!findUser || !(0, hashHelper_1.comparePassword)(password, findUser.password))
            throw new Error("Invalid credentials!");
        const { password: removePassword } = findUser, userData = __rest(findUser, ["password"]);
        return done(null, userData);
    }
    catch (err) {
        console.log(err);
        return done(err, undefined);
    }
})));
//# sourceMappingURL=localStrategy.js.map