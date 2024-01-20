import express from "express";
import AuthSignInRequest from "../requests/AuthSignInRequest";
import AuthSignUpRequest from "../requests/AuthSignUpRequest";
import { loginUser, createUser } from "../controllers/AuthController";

const router = express.Router();

router.route("/signin").post(AuthSignInRequest, loginUser);

router.route("/signup").post(AuthSignUpRequest, createUser);

export default router;
