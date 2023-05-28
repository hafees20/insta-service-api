import fs from 'fs'
import multer from 'multer';
import Posts from '../../schema/post/post-schema.js'
import Users from '../../schema/user/user-schema.js'
import { COMMON_FIELDS, CREDENTIALS, EMPTY_STRING, FILE_TYPE, IMAGE_FORMATS, POST_FIELDS, STORAGE, USER_FIELDS } from "../../constants/constants.js";
import { v2 as cloudinary } from 'cloudinary';
import { storage } from "../../storage/storage.multer.js";


export class PostController {

    // Home page
    static async home(req, res) {
        await Posts.find({}).populate({
            path: POST_FIELDS.POSTED_BY,
            select: [USER_FIELDS.USERNAME, USER_FIELDS.DP, USER_FIELDS.DP],
            model: Users
        }).sort(COMMON_FIELDS.CREATED_AT).then((theposts) => {
            if (theposts) {
                res.json({ posts: theposts });
            } else {
                res.status(400).json({ error: "No posts found" })
            }
        })
    };



    // Creating post
    static async createPost(req, res) {

        // Stores img temperorly to server and then renames it the post _id (from db)
        const multerStorage = storage(STORAGE.POSTS)

        const upload = multer({ storage: multerStorage }).single(FILE_TYPE.IMG);

        upload(req, res, (err) => {
            if (err) {
                return res.status(400).json({ error: "Upload Failed", err })

            } else {
                // setting post 
                const { caption } = req.body
                const newPost = new Posts({
                    postedBy: req.user,
                    caption: caption,
                    img: EMPTY_STRING
                });

                var path = STORAGE.POSTS
                // sending error if no file
                if (!req.file) {
                    return res.status(400).json({ error: "Upload failed" })
                }
                // setting path + filename
                var image = path + req.file.filename;
                newPost.save().then(result => {
                    fs.rename(image, path + result._id + IMAGE_FORMATS.JPG, (err, done) => {
                        if (err) {
                            return res.status(400).json({ error: "Upload Failed" })
                        } else {
                            // calling cloudinary function with passing result
                            uploadCloud(result)
                        }

                    })

                })
            }

        })

        // Upload to cloudinary
        const uploadCloud = (result) => {
            // taking the object id of the post from db response
            let id = result._id

            // Uploading the img by finding the path
            cloudinary.uploader.upload(STORAGE.POSTS + id + IMAGE_FORMATS.JPG, {
                api_key: CREDENTIALS.CLOUDINARY_API, api_secret: CREDENTIALS.CLOUDINARY_SECRET, cloud_name: CREDENTIALS.CLOUD_NAME
                , upload_preset: CREDENTIALS.UPLOAD_PRESET
            }, (error, result) => {
                if (error) {
                    return res.json({ error: "Upload Failed" })
                }

                // Deleting img from server
                fs.unlink(STORAGE.POSTS + `${id + IMAGE_FORMATS.JPG}`, function (err) {
                    if (err) {
                        return res.json({ error: "Error deleting image from server" })
                    }
                });
                // Updating image url with the url received from cloudinary
                Posts.findByIdAndUpdate(id,
                    { "img": result.url },
                    { new: true }).then((result) => { res.json({ message: "Successfully Uploaded" }) }
                    ).catch((err) => {
                        return res.status(400).json({ error: "Upload Failed" })
                    })
            });
        }

    };



    // Liking a post
    static async likePost(req, res) {

        // getting the post with the postId from req
        let post = await Posts.findById(req.body.postId)
        // setting likes to a variable
        let likes = post.likes.map(objId => objId.toString());
        // if already liked then to avoid error 
        if (likes.length !== 0) {
            let liked = likes.includes(req.user._id.toString());
            if (liked) {
                return res.json({ message: "Already Liked" })
            }
        }
        // finding and adding the user to the like array
        Posts.findByIdAndUpdate(req.body.postId,
            { $addToSet: { likes: req.user._id } },
            { new: true }
        ).exec((error, result) => {
            if (error) {
                return res.json({ error: error })
            } else {
                res.json({ result: result })
            }
        })
    };


    // Unliking a post
    static async unlikePost(req, res) {

        // finding post
        let post = await Posts.findById(req.body.postId)
        // setting likes to a variable
        let likes = post.likes.map(objId => objId.toString());
        // checking if likes array is empty
        if (likes.length !== 0) {
            let liked = likes.includes(req.user._id.toString())
            if (!liked) {
                return res.json({ message: "Not Liked", result: post })
            }
        }
        // finding and removing user from likes array
        Posts.findByIdAndUpdate(req.body.postId,
            { $pull: { likes: req.user._id } },
            { new: true }
        ).exec((error, result) => {
            if (error) {
                return res.status(400).json({ error: error })
            } else {
                res.json({ result: result })
            }
        })
    };

}