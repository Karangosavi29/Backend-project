import {Router} from "express"
import { logoutUser, 
        registerUser
        ,loginUser
        ,refreshAccessToken
        , changeCurrentpassword
        , getCurrentUser
        , updateAccountDetail
        , updateUserAvatar
        , updateUserCoverImage
        , getUserChannelProfile
        , getWatchHistory
    } from "../controllers/user.Controller.js"
import {upload} from "../middleware/multer.Middleware.js"
import { verifyJWT } from "../middleware/auth.Middleware.js"

const router =Router()



router.route("/register").post(
    upload.fields([                         // multiple files upload but not like array  only specific files
        {name:"avatar",maxCount:1},
        {name:"coverImage",maxCount:1},
    ]),
    registerUser
)


router.route("/Login").post(loginUser)

//secured routes
router.route("/Logout").post(verifyJWT,logoutUser)


router.route("/refrersh-token").post(refreshAccessToken)
router.route("/change-password").post(verifyJWT,changeCurrentpassword)
router.route("/current-user").get(verifyJWT,getCurrentUser)
router.route("/update-account").patch(verifyJWT,updateAccountDetail)
router.route("/avatar").patch(verifyJWT,upload.single("avatar"),updateUserAvatar)
router.route("/coverimage").patch(verifyJWT,upload.single("coverImage"),updateUserCoverImage)
router.route("/c/:username").get(verifyJWT,getUserChannelProfile)
router.route("/history").get(verifyJWT,getWatchHistory)



export default router