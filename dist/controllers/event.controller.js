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
exports.deleteEvent = exports.updateEvent = exports.addEvent = exports.getEventsBySearch = exports.getEventById = exports.getAllEvents = void 0;
const clients_1 = __importDefault(require("../lib/clients"));
const getAllEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const events = yield clients_1.default.event.findMany({
            select: {
                id: true,
                name: true,
                description: true,
                cover: true,
                city: true,
                date: true,
            },
        });
        return res
            .status(200)
            .json({ data: events, message: "Events retrieved successfully!" });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            data: null,
            message: "Something went wrong. Failed to retrieve events!",
        });
    }
});
exports.getAllEvents = getAllEvents;
const getEventById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { eventId: id } = req.params;
    try {
        const event = yield clients_1.default.event.findUnique({ where: { id } });
        return res.json({ data: event, message: "Events retrieved successfully!" });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            data: null,
            message: "Something went wrong. Failed to retrieve event!",
        });
    }
});
exports.getEventById = getEventById;
const getEventsBySearch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, city, date, max } = req.query;
        const lowerDateRange = date
            ? new Date(new Date(date.toString()).setUTCHours(0, 0, 0, 0))
            : undefined;
        const upperDateRange = date
            ? new Date(new Date(date.toString()).setUTCHours(23, 59, 59, 999))
            : undefined;
        const eventsMatchingSearchCriteria = yield clients_1.default.event.findMany(Object.assign({ where: {
                name: {
                    contains: name ? name.toString() : undefined,
                    mode: "insensitive",
                },
                city: {
                    name: {
                        contains: city ? city.toString() : undefined,
                        mode: "insensitive",
                    },
                },
                date: {
                    gte: lowerDateRange,
                    lte: upperDateRange,
                },
            }, select: {
                id: true,
                name: true,
                description: true,
                cover: true,
                city: true,
                date: true,
                address: true,
                category: true,
                hostedBy: true,
                tags: true
            }, orderBy: {
                createdAt: "desc",
            } }, (max && typeof Number(max) === "number" ? { take: Number(max) } : {})));
        return res.json({
            data: eventsMatchingSearchCriteria,
            message: "Events retrieved successfully!",
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            data: null,
            message: "Something went wrong. Failed to retrieve events!",
        });
    }
});
exports.getEventsBySearch = getEventsBySearch;
const addEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    if (!userId)
        return res.status(401).json({
            data: null,
            message: "User need to be authorized to add events.",
        });
    const { name, description, date, cover, cityId, address, category, hostedBy, tags, } = req.body;
    try {
        const newEvent = yield clients_1.default.event.create({
            data: {
                userId,
                name,
                description,
                cover,
                date: new Date(date),
                dateTime: new Date(date),
                cityId,
                address,
                category,
                hostedBy,
                tags,
            },
        });
        return res
            .status(201)
            .json({ data: newEvent, message: "Event added successfully!" });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            data: null,
            message: "Something went wrong. Failed to add event!",
        });
    }
});
exports.addEvent = addEvent;
const updateEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    const { name, description, date, cityId } = req.body;
    const { id } = req.params;
    try {
        const checkEvent = yield clients_1.default.event.findUnique({ where: { id, userId } });
        if (!checkEvent)
            return res.status(401).json({ message: "Event not belong to the user." });
        const updatedEvent = yield clients_1.default.event.update({
            where: { id },
            data: {
                userId,
                name,
                description,
                date: new Date(date),
                dateTime: new Date(date),
                cityId,
            },
        });
        return res.status(200).json({
            data: updatedEvent,
            message: "Event data updated successfully!",
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            data: null,
            message: "Something went wrong. Failed to update Event!",
        });
    }
});
exports.updateEvent = updateEvent;
const deleteEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    const { id } = req.params;
    try {
        const checkEvent = yield clients_1.default.event.findUnique({ where: { id, userId } });
        if (!checkEvent)
            return res.status(401).json({ message: "Event not belong to the user." });
        const deletedEvent = yield clients_1.default.event.delete({ where: { id } });
        return res
            .status(200)
            .json({ data: deletedEvent, message: "Event deleted successfully!" });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            data: null,
            message: "Something went wrong. Failed to delete event!",
        });
    }
});
exports.deleteEvent = deleteEvent;
//# sourceMappingURL=event.controller.js.map