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

export default userValidationSchema;