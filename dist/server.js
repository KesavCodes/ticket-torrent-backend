"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const dotenv_1 = __importDefault(require("dotenv"));
const test_route_1 = __importDefault(require("./routes/test.route"));
const index_auth_route_1 = __importDefault(require("./routes/auth/index.auth.route"));
const event_route_1 = __importDefault(require("./routes/event.route"));
const city_route_1 = __importDefault(require("./routes/city.route"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const ticket_route_1 = __importDefault(require("./routes/ticket.route"));
const request_route_1 = __importDefault(require("./routes/request.route"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8080;
app.use((0, cors_1.default)({
    // origin: "http://localhost:3000",
    credentials: true, // Enables cookies for CORS
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)("cookieSecretCode"));
app.use((0, express_session_1.default)({
    secret: "sessionSecretCode",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
    },
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use("/test", test_route_1.default);
app.use("/auth", index_auth_route_1.default);
app.use("/events", event_route_1.default);
app.use("/city", city_route_1.default);
app.use("/user", user_route_1.default);
app.use("/ticket", ticket_route_1.default);
app.use("/request", request_route_1.default);
app.get("/", (req, res) => res.status(200).send("Welcome to Ticket Torrent Backend!"));
app.listen(PORT, () => console.log(`listening on PORT: ${PORT}`));
//# sourceMappingURL=server.js.map