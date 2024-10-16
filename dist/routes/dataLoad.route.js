"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dataLoad_controller_1 = require("../controllers/dataLoad.controller");
const router = express_1.default.Router();
router.post("/", dataLoad_controller_1.loadDataToDb);
exports.default = router;
//# sourceMappingURL=dataLoad.route.js.map