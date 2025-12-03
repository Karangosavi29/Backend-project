import mongoose ,{Schema}from "mongoose";    
import bcrypt from "bcrypt"; // for hashing password
import jwt from "jsonwebtoken";  // for generating jwt tokens

const userSchema = new Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
            index:true
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,

        },
        fullname:{
            type:String,
            required:true,
            trim:true,
            index:true
        },
        password:{
            type:String,
            required:[true,"password is required"],

        },
        avtar:{
            type:String, //couldnary url
            required:true,
        },
        coverimage:  {
            type:String, //couldnary url
        },
        watchhistory:[      // watch history of videos it is an array of video ids
            {
                type:Schema.Types.ObjectId,
                ref:"video"
            }
        ],
        refreshTokens:{
            type:[String],
        }    

    },
    {timestamps:true} // createdAt , updatedAt  automatically managed by mongoose
)

userSchema.pre("save",async function(next){
    if(!this.ismodified("password")) return next();  // to avoid rehashing if password is not modified
    this.password= await bcrypt.hash(this.password,10)     // hashing the password with salt rounds 10
    next();
})

userSchema.methods.ispasswordcorrect=async function(password){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccesetoken=function(){
    jwt.sign(
        {
            _id:this._id,
            email:this.email,
            username:this.username, 
            fullname:this.fullname,
        },
        proccess.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:proccess.env.ACCESS_TOKEN_EXPIRES_IN
        } 
    )
}
userSchema.methods.generateRefreshtoken=function(){
    jwt.sign(
        {
            _id:this._id
        },
        proccess.env.REFERESH_TOKEN_SECRET,
        {
            expiresIn:proccess.env.REFRRESH_TOKEN_EXPIRES_IN
        } 
    )
}
export const user =mongoose.model("user")