"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const like_controller_1 = require("../controllers/like.controller");
const router = express_1.default.Router();
router.put("/:id", like_controller_1.updateLikeStatus);
exports.default = router;
//# sourceMappingURL=like.route.js.map