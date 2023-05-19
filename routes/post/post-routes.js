import express from "express";
import { ENDPOINTS } from "../../constants/constants.js";

const postRouter=express.Router()

postRouter.get(ENDPOINTS.HOME, (req,res)=>{
    res.send("Home")
});

postRouter.post(ENDPOINTS.CREATE, (req, res) => {
    res.send("Created Post")
});

postRouter.put(ENDPOINTS.LIKE,  (req, res) => {
    res.send("liked")
})

postRouter.put(ENDPOINTS.UNLIKE, (req, res) => {
    res.send("Unliked")
})

export default postRouter

