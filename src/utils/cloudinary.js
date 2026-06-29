import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: CLOUDINARY_API_KEY, 
  api_secret: CLOUDINARY_API_SECRET_KEY
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto'
            
        })
        console.log("File is uploaded yahoooooo......!", response.url);
        return response;

    } catch (error) {
        fs.unlinkSync(localFilePath) //Remove Locally saved temparory file 
        return null
    }
}

export { uploadOnCloudinary }