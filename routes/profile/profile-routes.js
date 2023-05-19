import express from 'express'

const profileRouter=express.Router()

profileRouter.put('/api/dpchange', (req,res)=>{
    res.send("DP Changed")
})

profileRouter.get('/api/profile/:username',(req, res) => {
    res.send("User Profile")
})

export default profileRouter