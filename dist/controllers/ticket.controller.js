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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTicket = exports.updateTicket = exports.addTicket = exports.getTicketById = exports.getAllTickets = void 0;
const clients_1 = __importDefault(require("../lib/clients"));
const getAllTickets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const events = yield clients_1.default.ticket.findMany({ take: 10 });
        return res
            .status(200)
            .json({ data: events, message: "Tickets retrieved successfully!" });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            data: null,
            message: "Something went wrong. Failed to retrieve tickets!",
        });
    }
});
exports.getAllTickets = getAllTickets;
const getTicketById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const event = yield clients_1.default.ticket.findUnique({ where: { id } });
        return res.json({ data: event, message: "Ticket retrieved successfully!" });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            data: null,
            message: "Something went wrong. Failed to retrieve ticket!",
        });
    }
});
exports.getTicketById = getTicketById;
const addTicket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    if (!userId)
        return res.status(401).json({
            data: null,
            message: "User need to be authorized to add tickets.",
        });
    const { eventId, price, quantity, status, category } = req.body;
    try {
        const newTicket = yield clients_1.default.ticket.create({
            data: {
                userId,
                eventId,
                price,
                quantity,
                status,
                category,
            },
        });
        return res
            .status(201)
            .json({ data: newTicket, message: "Ticket added successfully!" });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            data: null,
            message: "Something went wrong. Failed to add Ticket!",
        });
    }
});
exports.addTicket = addTicket;
const updateTicket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    if (!userId)
        return res.status(401).json({
            data: null,
            message: "User need to be authorized to update tickets.",
        });
    const { eventId, price, quantity, status, category } = req.body;
    const { id } = req.params;
    try {
        const updatedEvent = yield clients_1.default.ticket.update({
            where: { id },
            data: {
                userId,
                eventId,
                price,
                quantity,
                status,
                category,
            },
        });
        return res.status(200).json({
            data: updatedEvent,
            message: "Ticket data updated successfully!",
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            data: null,
            message: "Something went wrong. Failed to update Ticket!",
        });
    }
});
exports.updateTicket = updateTicket;
const deleteTicket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedEvent = yield clients_1.default.ticket.delete({ where: { id } });
        return res
            .status(200)
            .json({ data: deletedEvent, message: "Ticket deleted successfully!" });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            data: null,
            message: "Something went wrong. Failed to delete ticket!",
        });
    }
});
exports.deleteTicket = deleteTicket;
//# sourceMappingURL=ticket.controller.js.map