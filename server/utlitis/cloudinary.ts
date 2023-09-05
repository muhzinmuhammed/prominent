import 'dotenv/config'
import cloudinary from 'cloudinary'
const cloudinaryV=cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export {cloudinaryV}