import express  from "express"
import cors from "cors"
import cookieParser from "cookie-parser";    //secure cookie also used in crud operations



const app = express();


app.use(cors({
    origin:process.env.CORS_ORIGIN ,
    Credentials:true
}))

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))  //used for url lie karan+also store in url that also stored in body
app.use(express.static("public"))
app.use(cookieParser())


//routes import
import userRouter from "./routes/user.routes.js"


// routes declaration
app.use("/api/v1/users", userRouter)


export  {app};