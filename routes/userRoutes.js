const express = require("express");
const { registerUser, loginUser } = require("../controllers/userController");
const validate = require("../middlewares/validate");
const { registerSchema, loginSchema } = require("../validations/userValidation");

const router = express.Router();

// REGISTER
router.post("/register", validate(registerSchema), registerUser);

// LOGIN
router.post("/login", validate(loginSchema), loginUser);

module.exports = router;
