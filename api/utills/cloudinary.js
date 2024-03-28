import { v2 as cloudinary } from "cloudinary";
import fs from 'fs';

         
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API-SECRET 
});

const uploadOnCloudinary = async(localFilePath) =>{
    try{
        if(!localFilePath) return null;
        
        //upload the file on clodinary
        const res = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        });
        //file has been uploaded successfully
        console.log("file is uploaded on cloudinary",res.url);
        return res;
    }catch(error){
        fs.unlinkSync(localFilePath) // remove the locally saved temp file as the upload operation got failed
        return null;
    }
}

export default {uploadOnCloudinary};