"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ticket_controller_1 = require("../controllers/ticket.controller");
const router = express_1.default.Router();
router.get("/", ticket_controller_1.getAllTickets);
router.get("/:id", ticket_controller_1.getTicketById);
router.post("/", ticket_controller_1.addTicket);
router.put("/:id", ticket_controller_1.updateTicket);
router.delete("/:id", ticket_controller_1.deleteTicket);
exports.default = router;
//# sourceMappingURL=ticket.route.js.map