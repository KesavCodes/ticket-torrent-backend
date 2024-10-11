"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get("/setCookie", (req, res) => {
    return res
        .cookie("hello", "world", {
        maxAge: 1000 * 60 * 15,
        signed: true,
    })
        .sendStatus(200);
});
router.get("/getCookie", (req, res) => {
    console.log(req.cookies);
    console.log(req.signedCookies);
    return res.sendStatus(200);
});
router.get("/saveSession", (req, res) => {
    var _a;
    console.log("Saving session with Id: " + ((_a = req.session) === null || _a === void 0 ? void 0 : _a.id));
    req.session.user = { id: "testUserId" };
    return res.sendStatus(200);
});
router.get("/getSession", (req, res) => {
    var _a;
    console.log((_a = req.session) === null || _a === void 0 ? void 0 : _a.id, "--> Session ID");
    console.log(req.session, "--> Session data");
    return req.session && req.session.id
        ? res.sendStatus(200)
        : res.sendStatus(404);
});
exports.default = router;
//# sourceMappingURL=test.route.js.map