export class PostController{
    static home(req,res){
        res.send("Home")
    }

    static createPost(req,res){
        res.send("Created post")
    }

    static likePost(req,res){
        res.send("liked")
    }

    static unlikePost(req,res){
        res.send("Unliked")
    }
}