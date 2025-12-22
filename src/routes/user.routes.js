import {Router} from "express"
import { logoutUser, registerUser,loginUser } from "../controllers/user.Controller.js"
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

export default router