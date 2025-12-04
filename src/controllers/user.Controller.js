import { asyncHandler } from "../utils/asynchandler.js";
import { Apierror } from "../utils/Apierror.js";
import {user} from "../models/user.Model.js";
import {uploadOncloudinary} from "../utils/cloudinary.js";
import {Apiresponse} from "../utils/Apiresponse.js";


// what the step to get data from frontend to backend eg register user


const registerUser = asyncHandler(async (req, res)=>{
    // user detail from model what we need to get from frontend
    // validation of data  -not empty           --user give right email or not also check data is not empty
    // check user is already registered exist : username or email 
    // check for image or avatar
    // upload them to cloudinary  , avtar image
    // create user object -create entry in db
    // remove password and refresh token  field from response
    // check for user created or not 
    // return response to frontend



    const {fullname ,email,username , password} =  req.body           
    // console.log("email: ",email)                               //take data from json or form then use req.body
    
    

    if(
        [fullname,email,username,password].some((field) =>{field?.trim() === ""})
        
    ){
        throw new Apierror(400,"all field are required")
    }
    

    const existeduser = await user.findOne({

        $or :[{username},{email}]
    })
    
    if(existeduser){
        throw new Apierror(409,"user with email or username alreadt exist   ")

    }

    const avatarLocalpath = req.files?.avatar[0]?.path;
    // const coverImageLocalpath = req.files?.coverImage[0]?.path;   //if cover image is compulsary to put

    let coverImageLocalPath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path
    }


    if(!avatarLocalpath){
        throw new Apierror(400,"Avatar file is required")
    }

    const avatar = await uploadOncloudinary(avatarLocalpath)
    const coverImage =await uploadOncloudinary(coverImageLocalPath)

    if(!avatar){
        throw new Apierror(400,"Avatar file is required")
    }

    const newuser =await user.create({
        fullname,
        avatar:avatar.url,
        coverImage:coverImage?.url || " ",
        email,
        password,
        username: username.toLowerCase()
    })

    const createduser = await user.findById(newuser._id).select(
         "-password -refreshTokens"
    )
    if(!createduser){
        throw new Apierror(500,"something wen't wrong when the registering user")
    }


    return res.status(201).json(
        new Apiresponse(200, createduser,"user register succesfully")
    )

})
export {registerUser,

};