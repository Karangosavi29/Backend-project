import {Router} from "express"
import { registerUser } from "../controllers/user.Controller.js"
import {upload} from "../middleware/multer.Middleware.js"

const router =Router()



router.route("/register").post(
    upload.fields([                         // multiple files upload but not like array  only specific files
        {name:"avtar",maxCount:1},
        {name:"coverimage",maxCount:1},
    ]),
    registerUser
)

export default router