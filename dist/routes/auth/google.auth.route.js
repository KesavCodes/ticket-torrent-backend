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
    successRedirect: "/",
    failureRedirect: "/failure",
    session: true,
}));
router.get("/failure", (req, res) => {
    return res.status(400).send("Login failed. Try again!");
});
router.post("/logout", (req, res) => {
    req.logout((err) => {
        if (err)
            return res
                .status(500)
                .json({ message: "Something went wrong. Failed to logout user" });
        return res.status(200).json({ message: "User logged out successfully" });
    });
});
exports.default = router;
//# sourceMappingURL=google.auth.route.js.map