import express from "express";

const router=express.Router()


router.get('/api/home', (req,res)=>{
    res.send("Home")
});

router.post('/api/create', (req, res) => {
    res.send("Created Post")
});

router.post('/api/signup',  (req, res) => {
    res.send("Signed up")
})

router.post('/api/login', (req, res) => {
    res.send("Signed up")
})

router.put('/api/dpchange', (req,res)=>{
    res.send("DP Changed")
})

router.put('/api/likepost',  (req, res) => {
    res.send("liked")
})

router.put('/api/unlikepost', (req, res) => {
    res.send("Unliked")
})

router.get('/api/profile/:username',(req, res) => {
    res.send("User Profile")
})

router.put('/api/follow', (req, res) => {
    res.send("Followed")

})

router.put('/api/unfollow', (req, res) => {
    res.send("Unfollowed")
})


export default router