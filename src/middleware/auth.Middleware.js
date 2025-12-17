import { Apierror } from "../utils/Apierror"
import {asyncHandler} from "../utils/asynchandler"
import jwt from "jsonwebtoken"



export const verifyJWT =asyncHandler (async (req,_ ,next)=> {    // req,res and next also required in middleware 
    try {
        const token =req.cookies?.accesToken || req.header("authorization?")?.replace("Bearer","")
    
        if(!token){
            throw new Apierror(401,"unauthorized request")
        }
    
        const decodedToken = jwt.verify(Token,process.env.ACCESS_TOKEN_SECRET)
        await user.findById(decodedToken._id).select
        ("-password,-refreshTokens") //exclude password and refresh token from user data
    
        if(!user){
            //discuss about the frontend redirection
            throw new Apierror(401,"Invalide acces Token")
        }
    
        req.user=user;
        next()
    } catch (error) {
        throw new Apierror(401,"invalide access token")
    }
})