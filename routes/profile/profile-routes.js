import express from 'express'
import { ENDPOINTS } from '../../constants/constants.js'
import { ProfileController } from '../../controllers/profile/profile-controller.js'

const profileRouter=express.Router()

profileRouter.get(ENDPOINTS.PROFILE,ProfileController.getProfile)

profileRouter.put(ENDPOINTS.CHANGEDP,ProfileController.changeDp)

profileRouter.put(ENDPOINTS.FOLLOW, ProfileController.followUser)

profileRouter.put(ENDPOINTS.UNFOLLOW, ProfileController.unfollowUser)

export default profileRouter