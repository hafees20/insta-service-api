import express from "express";
import { ENDPOINTS } from "../../constants/constants.js";

const authRouter=express.Router()

authRouter.post(ENDPOINTS.SIGNUP,  (req, res) => {
    res.send("Signed up")
})

authRouter.post(ENDPOINTS.SIGNIN, (req, res) => {
    res.send("Signed in")
})

export default authRouter