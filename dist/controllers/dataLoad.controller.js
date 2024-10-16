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
exports.loadDataToDb = void 0;
const clients_1 = __importDefault(require("../lib/clients"));
const loadDataToDb = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    console.log("--in load data to db");
    try {
        const addEvents = yield clients_1.default.event.createMany({
            data,
        });
        return res
            .status(201)
            .json({ data: addEvents, message: "Events added successfully!" });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            data: null,
            message: "Something went wrong. Failed to add Events!",
        });
    }
});
exports.loadDataToDb = loadDataToDb;
//# sourceMappingURL=dataLoad.controller.js.map