import express from "express";
import { ENDPOINTS } from "../../constants/constants.js";
import { PostController } from "../../controllers/post/post-controller.js";
import requireLogin from "../../middlewares/require-login.js";

const postRouter=express.Router()

postRouter.get(ENDPOINTS.HOME,requireLogin,PostController.home);

postRouter.post(ENDPOINTS.CREATE,requireLogin,PostController.createPost);

postRouter.put(ENDPOINTS.LIKE,requireLogin,PostController.likePost);

postRouter.put(ENDPOINTS.UNLIKE,requireLogin,PostController.unlikePost);

export default postRouter

