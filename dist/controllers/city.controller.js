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
exports.deleteCity = exports.updateCity = exports.addCity = exports.getAllCities = void 0;
const clients_1 = __importDefault(require("../lib/clients"));
const getAllCities = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cities = yield clients_1.default.city.findMany({ take: 10 });
        return res
            .status(200)
            .json({ data: cities, message: "Cities retrieved successfully!" });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            data: null,
            message: "Something went wrong. Failed to retrieve cities!",
        });
    }
});
exports.getAllCities = getAllCities;
const addCity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    if (!name)
        return res.status(400).json({
            data: null,
            message: "City name cannot be empty. Failed to add city!",
        });
    try {
        const newCity = yield clients_1.default.city.create({
            data: { name },
        });
        return res
            .status(201)
            .json({ data: newCity, message: "City added successfully!" });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            data: null,
            message: "Something went wrong. Failed to add city!",
        });
    }
});
exports.addCity = addCity;
const updateCity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name } = req.body;
    try {
        const updatedCity = yield clients_1.default.city.update({
            where: { id },
            data: { name },
        });
        return res.status(200).json({
            data: updatedCity,
            message: "City data updated successfully!",
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            data: null,
            message: "Something went wrong. Failed to update city!",
        });
    }
});
exports.updateCity = updateCity;
const deleteCity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedCity = yield clients_1.default.city.delete({ where: { id } });
        return res
            .status(200)
            .json({ data: deletedCity, message: "City data deleted successfully!" });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            data: null,
            message: "Something went wrong. Failed to delete city data!",
        });
    }
});
exports.deleteCity = deleteCity;
//# sourceMappingURL=city.controller.js.map