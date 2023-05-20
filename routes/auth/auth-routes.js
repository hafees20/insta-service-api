import express from "express";
import { ENDPOINTS } from "../../constants/constants.js";
import AuthController from "../../controllers/auth/auth-controller.js";

const authRouter=express.Router()

authRouter.post(ENDPOINTS.SIGNUP,AuthController.signUp)

authRouter.post(ENDPOINTS.SIGNIN,AuthController.signIn)

export default authRouter