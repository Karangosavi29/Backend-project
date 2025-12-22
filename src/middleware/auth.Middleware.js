import { Apierror } from "../utils/Apierror.js"
import {asyncHandler} from "../utils/asynchandler.js"
import jwt from "jsonwebtoken"
import {User} from "../models/user.Model.js"



export const verifyJWT =asyncHandler (async (req,_ ,next)=> {    // req,res and next also required in middleware 
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")

    
        if(!token){
            throw new Apierror(401,"unauthorized request")
        }
    
        const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
        const user = await User.findById(decodedToken._id).select
        ("-password -refreshTokens") //exclude password and refresh token from user data
    
        if(!user){
            //discuss about the frontend redirection
            throw new Apierror(401,"Invalide acces Token")
        }
    
        req.user=user;
        next()
    } catch (error) {
        throw new Apierror(401,error?.message || "invalide access token")
    }
})