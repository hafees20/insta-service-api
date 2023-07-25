import express from 'express'
import { ENDPOINTS } from '../../constants/constants.js'
import { ProfileController } from '../../controllers/profile/profile-controller.js'
import requireLogin from '../../middlewares/require-login.js'

const profileRouter = express.Router()

profileRouter.get(ENDPOINTS.PROFILE, requireLogin, ProfileController.getProfile)

profileRouter.put(ENDPOINTS.CHANGEDP, requireLogin, ProfileController.changeDp)

profileRouter.put(ENDPOINTS.FOLLOW, requireLogin, ProfileController.followUser)

profileRouter.put(ENDPOINTS.UNFOLLOW, requireLogin, ProfileController.unfollowUser)

export default profileRouter