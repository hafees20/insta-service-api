import express from 'express';
import authRouter from './auth/auth-routes.js';
import postRouter from './post/post-routes.js';
import profileRouter from './profile/profile-routes.js';

const router = express.Router();

router.use(authRouter);
router.use(postRouter);
router.use(profileRouter)

export default router;
