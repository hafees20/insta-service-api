export class ProfileController {
    static getProfile(req, res) {
        res.status(200).json({ "User Profile": req.params.username })
    }
    static changeDp(req, res) {
        res.send("DP Changed")
    }

    static followUser(req, res) {
        res.send("followed")
    }

    static unfollowUser(req, res) {
        res.send("Unfollowed")
    }
    
}