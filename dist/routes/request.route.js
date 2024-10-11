"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const request_controller_1 = require("../controllers/request.controller");
const router = express_1.default.Router();
router.get("/", request_controller_1.getAllRequests);
router.get("/:id", request_controller_1.getRequestById);
router.post("/", request_controller_1.addRequest);
router.put("/:id", request_controller_1.updateRequest);
router.delete("/:id", request_controller_1.deleteRequest);
exports.default = router;
//# sourceMappingURL=request.route.js.map