import multer from 'multer'
import fs from 'fs'
import cloudinary from 'cloudinary'
import { CREDENTIALS, IMAGE_FORMATS, STORAGE } from '../../constants/constants.js'
import Posts from '../../schema/post/post-schema.js'
import Users from '../../schema/user/user-schema.js'
import { storage } from '../../storage/storage.multer.js'

export class ProfileController {

    // get any users profile data
    static async getProfile(req, res) {
        if (!req.params.username) {
            return res.status(400).json({ error: "User not found" })
        }
        Users.findOne({ username: req.params.username }).then((user) => {
            if (user) {
                const { username, dp, followers, following, bio } = user
                if (!username, dp, followers, following, bio) {
                    return res.status(400).json({ error: "User not found" })
                }
                Posts.find({ postedBy: user._id }).then((posts) => {
                    res.json({
                        userposts: posts,
                        user: {
                            username,
                            dp,
                            userId: user._id,
                            followers,
                            following,
                            bio: bio == undefined || null ? "" : bio
                        }
                    })
                })
            } else {
                return res.status(400).json({ error: "User not found" })
            }
        })
    }


    // Changing dp of user
    static changeDp(req, res) {
        const upload = multer({ storage: storage(STORAGE.DP) }).single('dp');

        upload(req, res, (err) => {
            if (err) {
                console.log(err)
                return res.status(400).json({ error: "Upload Failed" })
            } else {
                const path = STORAGE.DP;
                const oldPath = path + req.file.filename;
                const newPath = path + req.user._id + IMAGE_FORMATS.JPG;

                fs.rename(oldPath, newPath, (err, done) => {
                    if (!err)
                        cloudinary.uploader.upload(newPath, {
                            api_key: CREDENTIALS.CLOUDINARY_API,
                            api_secret: CREDENTIALS.CLOUDINARY_SECRET,
                            cloud_name: CREDENTIALS.CLOUD_NAME,
                            upload_preset: CREDENTIALS.UPLOAD_PRESET
                        },
                            (error, result) => {
                                if (error) {
                                    return res.json({ error: "Error changing dp" })
                                }
                                fs.unlink(newPath,  (err)=> {
                                    if (err) {
                                        return res.json({ error: "Error changing dp" })
                                    }
                                });
                                Users.findByIdAndUpdate(req.user._id,
                                    { "dp": result.url },
                                    { new: true }).then((resultDb) => {
                                        res.json({ message: "Successfully Uploaded" })
                                    }).catch(err => { console.log(err) })
                            })

                })
            }
        })
    };

    static async followUser(req, res) {
        if (!req.body.userId) {
            return res.status(400).json({ error: "Error following user" })
        }
        Users.findByIdAndUpdate(req.body.userId,
            { $push: { followers: req.user._id } },
            { new: true },
            (error, result) => {
                if (error) {
                    res.json({ error: error })
                } else {
                    Users.findByIdAndUpdate(req.user._id,
                        { $push: { following: req.body.userId } },
                        { new: true }
                    ).then((newresult) => {
                        res.json({ result: result, newresult: newresult })
                    }).catch((err) => {
                        return res.status(400).json({ error: err })
                    })
                }
            }
        )

    }

    static async unfollowUser(req, res) {
        if (!req.body.userId) {
            return res.status(400).json({ error: "Error while unfollowing user" })
        }
        Users.findByIdAndUpdate(req.body.userId,
            { $pull: { followers: req.user._id } },
            { new: true },
            (error, result) => {
                if (error) {
                    return res.status(400).json({ error: "Error while unfollowing user" })
                } else {
                    Users.findByIdAndUpdate(req.user._id,
                        { $pull: { following: req.body.userId } },
                        { new: true }
                    ).then((newresult) => {
                        res.json({ result: result, newresult: newresult })
                    }).catch((err) => {
                        return res.status(400).json({ error: "Error while unfollowing user" })
                    })
                }
            }
        )

    }

}