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
exports.deleteUser = exports.getUserById = exports.getMyProfileDetail = exports.getAllUsers = void 0;
const clients_1 = __importDefault(require("../lib/clients"));
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield clients_1.default.user.findMany({ take: 10 });
        return res
            .status(200)
            .json({ data: users, message: "Users retrieved successfully!" });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            data: null,
            message: "Something went wrong. Failed to retrieve users!",
        });
    }
});
exports.getAllUsers = getAllUsers;
const getMyProfileDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    if (!id)
        return res.status(401).json({
            data: null,
            message: "User not authenticated.",
        });
    try {
        const user = yield clients_1.default.user.findUnique({
            where: { id },
            select: {
                id: true,
                email: true,
                username: true,
                name: true,
                avatar: true,
                // soldTickets: true,
                // boughtTickets: true,
                saves: true,
                likes: {
                    select: {
                        id: true,
                        eventId: true,
                    },
                },
                requests: true,
                tickets: true,
                _count: {
                    select: {
                        followers: true,
                        follows: true,
                    },
                },
            },
        });
        return res.json({
            data: user,
            message: "User profile data retrieved successfully!",
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            data: null,
            message: "Something went wrong. Failed to retrieve user profile data!",
        });
    }
});
exports.getMyProfileDetail = getMyProfileDetail;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield clients_1.default.user.findUnique({
            where: { id },
            select: {
                id: true,
                email: true,
                username: true,
                name: true,
                avatar: true,
                phone: true,
            },
        });
        return res.json({ data: user, message: "User retrieved successfully!" });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            data: null,
            message: "Something went wrong. Failed to retrieve user data!",
        });
    }
});
exports.getUserById = getUserById;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const checkUser = yield clients_1.default.user.findUnique({ where: { id } });
        if (!checkUser)
            return res.status(400).json({ message: "Something went wrong." });
        const deleteUser = yield clients_1.default.user.delete({ where: { id } });
        return res
            .status(200)
            .json({ data: deleteUser, message: "User deleted successfully!" });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            data: null,
            message: "Something went wrong. Failed to delete user!",
        });
    }
});
exports.deleteUser = deleteUser;
//# sourceMappingURL=user.controller.js.map