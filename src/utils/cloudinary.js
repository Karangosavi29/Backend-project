import { v2 as cloudinary } from "cloudinary";
import fs from "fs"; // Importing the file system module

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME ,
  api_key: process.env.CLOUDINARY_API_KEY ,
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOncloudinary = async (Localfilepath) =>{
    try {
        if (!Localfilepath) return null
        // Upload the file to Cloudinary
        const response =await cloudinary.uploader.upload(Localfilepath,{
            resource_type:"auto"
        })
        // file has been successfully uploaded
        // console.log("file uploaded successfully",response.url);
        fs.unlinkSync(Localfilepath)
        return response;
    } catch (error) {
        fs.unlinksync (Localfilepath) // remove the file from local server if upload fails
        return null ; 
    }
}


export {uploadOncloudinary} ;