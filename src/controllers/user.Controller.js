import { asyncHandler } from "../utils/asynchandler.js";
import { Apierror } from "../utils/Apierror.js";
import {User} from "../models/user.Model.js";
import {uploadOncloudinary} from "../utils/cloudinary.js";
import {Apiresponse} from "../utils/Apiresponse.js";
import jwt from "jsonwebtoken"


// what the step to get data from frontend to backend eg register user

const generateAccessTokenAndRefreshToken =async (userId) =>{
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccesetoken()
        const refreshToken = user.generateRefreshtoken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}
        
    } catch (error) {
        throw new Apierror (500,"something went wrong while generating the refresh and accese token")
        
    }
}

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

    const newuser =await User.create({
        fullname,
        avatar:avatar.url,
        coverImage:coverImage?.url || " ",
        email,
        password,
        username: username.toLowerCase()
    })

    const createduser = await User.findById(newuser._id).select(
         "-password -refreshTokens"
    )
    if(!createduser){
        throw new Apierror(500,"something wen't wrong when the registering user")
    }


    return res.status(201).json(
        new Apiresponse(200, createduser,"user register succesfully")
    )

})

const loginUser =asyncHandler(async(req,res)=>{
    // req body -> data
    // username or email
    // find the user
    // password check
    // accese and refersh token
    // send cookie

    const {email,username,password} =req.body;

    if(!(username || email)){
        throw new Apierror(400,"username or password is required")
    }

    const user  = await User.findOne({
        $or: [{username}, {email}]
    })

    if(!user ){
        throw new Apierror(404,"user does't exit ")
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) throw new Apierror(401, "Incorrect password");


    
    const {accessToken, refreshToken} = await generateAccessTokenAndRefreshToken(user._id)




    const loggedInUser =await User.findById(user._id).select("-password -refreshToken ")

    const options ={                  //cookies
        httpOnly :true,
        secure:true
    }
    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new Apiresponse(
            200,
            {
                user :loggedInUser,accessToken,refreshToken 
            },
            "user loggedIn Succesfully"
        )
    )


})

const logoutUser = asyncHandler(async(req ,res ) => {
        await User.findByIdAndUpdate(
            req.user._id,
            {
                $set:{refreshToken:undefined}
            },
            {
                new:true
            }
        )
        const options={
            httpOnly:true,
            secure:true
        }
        return res
        .status (200)
        .clearCookie("accessToken",options)
        .clearCookie("refreshToken",options)
        .json(new Apiresponse(200,{},"User Logout succesfully"))
})

const refreshAccessToken = asyncHandler(async(req,res)=>
    {
        const incomingrefreshToken =req.cookies.
        refreshToken || req.body.refreshToken

        if(!incomingrefreshToken){
            throw new Apierror(401,"unauthorized request")
        }
        try {
            const decodedToken = jwt.verify(
                incomingrefreshToken,
                process.env.REFERESH_TOKEN_SECRET,
            )
    
            const user =await User.findById(decodedToken._id)
             if(!user){
                throw new Apierror(401,"Invalide refresh token")
            }
            if(incomingrefreshToken !== user?.refreshTokens){
                throw new Apierror(401,"refresh token is expired or used ")
            }
            
    
            const options={
                httpOnly:true,
                secure:true
            }
    
            const {accessToken,NewrefreshToken }=await generateAccessTokenAndRefreshToken(user._id)
    
            return res
            .status(200)
            .cookie("accessToken",accessToken)
            .cookie("RefreshToken",NewrefreshToken)
            .json(
                new Apiresponse(200,{accessToken,refreshToken:NewrefreshToken},
                    "access token refreshed succesfully")
            )
        } catch (error) {
            throw new Apierror(401, error?.message ||"Invalid refresh token")
        }
})


const changeCurrentpassword =asyncHandler(async(req,res)=>{     
    const {oldPassword,newPassword}= req.body

    const user =await User.findById(req.user?._id)
    const isPasswordisCorrect =await user.isPasswordCorrect(oldPassword)

    if(!isPasswordisCorrect){
        throw new Apierror (400,"old passwprd is incorrect")
    }

    user.password= newPassword
    await user.save({validateBeforeSave:false})

    return res
    .status(200)
    .json(new Apiresponse(200,{},"password change Succesfully"))
})

const getCurrentUser = asyncHandler(async(req,res)=>{
    return res
    .status(200)
    .json(200,req.user,"current user fetched succesfully")
})

const updateAccountDetail =asyncHandler(async(req,res)=> {
    const {email,fullname,}=req.body

    if(!fullname || !email){
        throw new Apierror(400,"All field are required ")
    }

    const user = User.findByIdAndUpdate(
        req.user?._id,
        {
            $set:{
                fullname: fullname,
                email:  email
            }
        },
        {new:true}

    ).select("-password")


    return res
    .status(200)
    .json(new Apiresponse(200,user ,"account detail updated sucessfully"))

})

const updateUserAvatar =asyncHandler(async(req,res) => {
    const avatarLocalPath =req.file?.path

    if(!avatarLocalPath){
        throw new Apiresponse(400,"Avatar file is Missing ")
    }

    const Avatar =await uploadOncloudinary(avatarLocalPath)

    if(!Avatar.url){
        throw new Apiresponse(400,"Error while uploading on avatar ")
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,

        {
            $set:{
                Avatar:Avatar.url
            }
        },
        {new:true}
    ).select("-password")

    return res
    .status(200)
    .json(new Apiresponse(200, user, "Avatar Update succesfully"))
})

const updateUserCoverImage =asyncHandler(async(req,res) => {
    const CoverImageLocalPath =req.file?.path

    if(!CoverImageLocalPath){
        throw new Apiresponse(400,"coverImage file is Missing ")
    }

    const coverImage =await uploadOncloudinary(CoverImageLocalPath)

    if(!coverImage.url){
        throw new Apiresponse(400,"Error while uploading on CoverImage ")
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,

        {
            $set:{
                coverImage:coverImage.url
            }
        },
        {new:true}
    ).select("-password")

    return res
    .status(200)
    .json(new Apiresponse(200,user,"Coverimage updated succesfully"))
})

export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentpassword,
    getCurrentUser,
    updateAccountDetail,
    updateUserAvatar,
    updateUserCoverImage

};