"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const city_controller_1 = require("../controllers/city.controller");
const router = express_1.default.Router();
router.get("/", city_controller_1.getAllCities);
router.post("/", city_controller_1.addCity);
router.put("/:id", city_controller_1.updateCity);
router.delete("/:id", city_controller_1.deleteCity);
exports.default = router;
//# sourceMappingURL=city.route.js.map