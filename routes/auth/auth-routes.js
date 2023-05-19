import express from "express";

const authRouter=express.Router()

authRouter.post('/api/signup',  (req, res) => {
    res.send("Signed up")
})

authRouter.post('/api/login', (req, res) => {
    res.send("Signed in")
})

export default authRouter