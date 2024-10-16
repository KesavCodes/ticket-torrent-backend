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
exports.default = router;
//# sourceMappingURL=google.auth.route.js.map