import express from "express";

const postRouter=express.Router()

postRouter.get('/api/home', (req,res)=>{
    res.send("Home")
});

postRouter.post('/api/create', (req, res) => {
    res.send("Created Post")
});


postRouter.put('/api/likepost',  (req, res) => {
    res.send("liked")
})

postRouter.put('/api/unlikepost', (req, res) => {
    res.send("Unliked")
})


postRouter.put('/api/follow', (req, res) => {
    res.send("Followed")

})

postRouter.put('/api/unfollow', (req, res) => {
    res.send("Unfollowed")
})

export default postRouter

