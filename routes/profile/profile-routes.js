import express from 'express'
import { ENDPOINTS } from '../../constants/constants.js'

const profileRouter=express.Router()

profileRouter.get(ENDPOINTS.PROFILE,(req, res) => {
    res.status(200).json({"User Profile":req.params.username})
})

profileRouter.put(ENDPOINTS.CHANGEDP, (req,res)=>{
    res.send("DP Changed")
})

profileRouter.put(ENDPOINTS.FOLLOW, (req, res) => {
    res.send("Followed")

})

profileRouter.put(ENDPOINTS.UNFOLLOW, (req, res) => {
    res.send("Unfollowed")
})

export default profileRouter