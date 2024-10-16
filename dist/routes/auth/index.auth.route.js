"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = void 0;
const express_1 = __importDefault(require("express"));
const local_auth_route_1 = __importDefault(require("./local.auth.route"));
const google_auth_route_1 = __importDefault(require("./google.auth.route"));
require("../../strategies/serializeDeserialize");
const router = express_1.default.Router();
router.use("/local", local_auth_route_1.default);
router.use("/google", google_auth_route_1.default);
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
router.post("/logout", exports.logout);
exports.default = router;
//# sourceMappingURL=index.auth.route.js.map