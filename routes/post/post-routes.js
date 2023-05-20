import express from "express";
import { ENDPOINTS } from "../../constants/constants.js";
import { PostController } from "../../controllers/post/post-controller.js";

const postRouter=express.Router()

postRouter.get(ENDPOINTS.HOME,PostController.home);

postRouter.post(ENDPOINTS.CREATE,PostController.createPost);

postRouter.put(ENDPOINTS.LIKE,PostController.likePost);

postRouter.put(ENDPOINTS.UNLIKE,PostController.unlikePost);

export default postRouter

