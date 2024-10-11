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
exports.deleteRequest = exports.updateRequest = exports.addRequest = exports.getRequestById = exports.getAllRequests = void 0;
const clients_1 = __importDefault(require("../lib/clients"));
const getAllRequests = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const events = yield clients_1.default.request.findMany({ take: 10 });
        return res
            .status(200)
            .json({ data: events, message: "Requests retrieved successfully!" });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            data: null,
            message: "Something went wrong. Failed to retrieve requests!",
        });
    }
});
exports.getAllRequests = getAllRequests;
const getRequestById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const request = yield clients_1.default.request.findUnique({ where: { id } });
        return res.json({
            data: request,
            message: "Requests retrieved successfully!",
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            data: null,
            message: "Something went wrong. Failed to retrieve request!",
        });
    }
});
exports.getRequestById = getRequestById;
const addRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    if (!userId)
        return res.status(401).json({ data: null, message: "User need to be authorized to add requests." });
    const { name, eventUrl, status } = req.body;
    try {
        const newRequest = yield clients_1.default.request.create({
            data: {
                userId,
                name,
                eventUrl,
                status,
            },
        });
        return res
            .status(201)
            .json({ data: newRequest, message: "Request added successfully!" });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            data: null,
            message: "Something went wrong. Failed to add request!",
        });
    }
});
exports.addRequest = addRequest;
const updateRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    const { name, eventUrl, status } = req.body;
    const { id } = req.params;
    try {
        const updatedRequest = yield clients_1.default.request.update({
            where: { id },
            data: {
                userId,
                name,
                eventUrl,
                status,
            },
        });
        return res.status(200).json({
            data: updatedRequest,
            message: "Request data updated successfully!",
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            data: null,
            message: "Something went wrong. Failed to update Request!",
        });
    }
});
exports.updateRequest = updateRequest;
const deleteRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedRequest = yield clients_1.default.request.delete({ where: { id } });
        return res
            .status(200)
            .json({ data: deletedRequest, message: "Request deleted successfully!" });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            data: null,
            message: "Something went wrong. Failed to delete request!",
        });
    }
});
exports.deleteRequest = deleteRequest;
//# sourceMappingURL=request.controller.js.map