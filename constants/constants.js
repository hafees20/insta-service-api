import dotenv from 'dotenv'
dotenv.config()

export const CREDENTIALS = {
    MONGOURI: process.env.MONGOURI,
    JWT_SECRET: process.env.JWT_SECRET,
    CLOUDINARY_URL: process.env.CLOUDINARY_URL,
    CLOUDINARY_API: process.env.CLOUDINARY_API,
    CLOUDINARY_SECRET: process.env.CLOUDINARY_SECRET,
    DB_NAME: process.env.DB_NAME,
    CLOUD_NAME: process.env.CLOUD_NAME,
    UPLOAD_PRESET: process.env.UPLOAD_PRESET
}

export const ENDPOINTS = {
    SIGNUP: '/api/signup',
    SIGNIN: '/api/login',
    HOME: '/api/home',
    CREATE: '/api/create',
    LIKE: '/api/likepost',
    UNLIKE: '/api/unlikepost',
    FOLLOW: '/api/follow',
    UNFOLLOW: '/api/unfollow',
    CHANGEDP: '/api/dpchange',
    PROFILE: '/api/profile/:username'
}

export const AUTH = {
    NO_DP: "nodp.svg"
}

export const STORAGE = {
    POSTS: "./images/posts/",
    DP:"./images/dp/"
}
export const FILE_TYPE = {
    IMG: "img"
}
export const IMAGE_FORMATS = {
    IMG: ".img",
    JPG: ".jpg"
}

export const EMPTY_STRING = "";

export const POST_FIELDS = {
    POSTED_BY: "postedBy",
    IMG: "img",
    CAPTION: "caption",
    LIKES: "likes"
}

export const USER_FIELDS = {
    EMAIL: "email",
    USERNAME: "username",
    DP: "dp",
    BIO: "bio",
    FOLLOWERS: "followers",
    FOLLOWING: "following"
}

export const COMMON_FIELDS={
    CREATED_AT:"-createdAt",
    UPDATED_AT:"-updatedAt"
}