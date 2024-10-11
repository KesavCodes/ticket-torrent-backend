"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const local_auth_route_1 = __importDefault(require("./local.auth.route"));
const google_auth_route_1 = __importDefault(require("./google.auth.route"));
require("../../strategies/serializeDeserialize");
const router = express_1.default.Router();
router.use("/local", local_auth_route_1.default);
router.use("/google", google_auth_route_1.default);
exports.default = router;
//# sourceMappingURL=index.auth.route.js.map