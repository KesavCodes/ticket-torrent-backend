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
exports.logout = exports.localLogin = exports.localRegisterUser = void 0;
const clients_1 = __importDefault(require("../../lib/clients"));
const express_validator_1 = require("express-validator");
const hashHelper_1 = require("../../lib/hashHelper");
const localRegisterUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    console.log(errors);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array().map((err, index) => `${index + 1}. ${err.msg}`) });
    }
    const { username, password, email } = req.body;
    try {
        const existingUser = yield clients_1.default.user.findUnique({
            where: { username: username },
        });
        if (existingUser)
            throw new Error("Username already in use");
        const hashedPassword = (0, hashHelper_1.hashPassword)(password);
        const _a = yield clients_1.default.user.create({
            data: { username, email, password: hashedPassword },
        }), { password: removePassword } = _a, newUser = __rest(_a, ["password"]);
        return res
            .status(201)
            .json({ message: "User registered successfully", data: newUser });
    }
    catch (err) {
        console.error(err);
        if (err instanceof Error) {
            return res.status(400).json({ message: err.message });
        }
        return res
            .status(500)
            .json({ message: "Something went wrong. Failed to register user!" });
    }
});
exports.localRegisterUser = localRegisterUser;
const localLogin = (req, res) => {
    console.log(req.user, "-- From: req.user");
    return res.status(200).json({ message: "User Logged in successfully" });
};
exports.localLogin = localLogin;
const logout = (req, res) => {
    if (!req.user)
        return res.status(401).json({ message: "User not authenticated" });
    req.logout((err) => {
        if (err)
            return res
                .status(500)
                .json({ message: "Something went wrong. Failed to logout user" });
        return res.status(200).json({ message: "User logged out successfully" });
    });
};
exports.logout = logout;
//# sourceMappingURL=local.auth.controller.js.map