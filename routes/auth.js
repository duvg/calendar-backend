/**
 * Auth Routes
 * host + /api/auth
 */
const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/field-validators");
const { createUser, loginUser, renewToken } = require("../controllers/auth");
const { validateJWT } = require("../middlewares/validate-jwt");

const router = Router();

router.post(
  "/new",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Email is required").isEmail(),
    check("password", "Password must have a minimum of 6 characters").isLength({
      min: 6,
    }),
    validateFields,
  ],
  createUser
);

// Login
router.post(
  "/",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Passwod must have a minimum of 6 characters").isLength({
      min: 6,
    }),
    validateFields,
  ],
  loginUser
);

// Renew token
router.get("/renew", validateJWT, renewToken);

module.exports = router;
