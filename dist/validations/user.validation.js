"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { checkSchema } = require('express-validator');
const userValidationSchema = checkSchema({
    username: {
        isString: true,
        notEmpty: true,
        errorMessage: 'Username is required',
    },
    password: {
        isLength: {
            options: { min: 5 },
            errorMessage: 'Password should be at least 5 characters long',
        },
    },
    email: {
        isEmail: true,
        errorMessage: 'Please provide a valid email address',
    },
});
exports.default = userValidationSchema;
//# sourceMappingURL=user.validation.js.map