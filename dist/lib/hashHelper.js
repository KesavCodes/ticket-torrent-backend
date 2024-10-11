"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.hashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const saltRounds = 10;
const hashPassword = (password) => {
    const salt = bcrypt_1.default.genSaltSync(saltRounds);
    return bcrypt_1.default.hashSync(password, salt);
};
exports.hashPassword = hashPassword;
const comparePassword = (plainTextPassword, hashedPassword) => bcrypt_1.default.compareSync(plainTextPassword, hashedPassword);
exports.comparePassword = comparePassword;
//# sourceMappingURL=hashHelper.js.map