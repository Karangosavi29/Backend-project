import { asyncHandler } from "../utils/asynchandler.js";


const registerUser = asyncHandler(async(req ,res )=>{
    res.status(200).json({
        message:"hello from register user controller"
    })
})


export {registerUser,

};