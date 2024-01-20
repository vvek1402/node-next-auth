const express = require("express");
const { AuthSignInRequest } = require('../requests/AuthSignInRequest'); 
const { AuthSignUpRequest } = require('../requests/AuthSignUpRequest');

const {
  loginUser,
  createUser
} = require("../controllers/AuthController");

const router = express.Router();

router.route("/signin").post(AuthSignInRequest, loginUser);

router.route("/signup").post(AuthSignUpRequest ,createUser);

module.exports = router;
