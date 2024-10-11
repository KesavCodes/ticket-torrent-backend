"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
require("../../strategies/localStrategy");
const local_auth_controller_1 = require("../../controllers/auth/local.auth.controller");
const user_validation_1 = __importDefault(require("../../validations/user.validation"));
const router = express_1.default.Router();
router.post("/register", user_validation_1.default, local_auth_controller_1.localRegisterUser);
router.post("/login", passport_1.default.authenticate("local"), local_auth_controller_1.localLogin);
router.post("/logout", local_auth_controller_1.logout);
exports.default = router;
//# sourceMappingURL=local.auth.route.js.map