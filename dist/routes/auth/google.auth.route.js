"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
require("../../strategies/googleStrategy");
const router = express_1.default.Router();
router.get("/login", passport_1.default.authenticate("google"));
router.get("/callback", passport_1.default.authenticate("google", {
    successRedirect: "/google/success",
    failureRedirect: "/google/failure",
    session: true,
}));
router.get("/google/success", (req, res) => {
    var _a;
    console.log(req.user, "-- From: req.user");
    return res
        .status(200)
        .json({ message: "User Logged in successfully", user: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id });
});
router.get("/google/failure", (req, res) => {
    return res.status(400).send("Login failed. Try again!");
});
exports.default = router;
//# sourceMappingURL=google.auth.route.js.map