import mongoose ,{Schema}from "mongoose";    
import bcrypt from "bcrypt"; // for hashing password
import jwt from "jsonwebtoken";  // for generating jwt tokens

const UserSchema = new Schema(
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
        avatar:{
            type:String, //couldnary url
            required:true,
        },
        coverImage:  {
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

UserSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();  // to avoid rehashing if password is not modified
    this.password= await bcrypt.hash(this.password,10)     // hashing the password with salt rounds 10
    next();
})

UserSchema.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password,this.password)
}

UserSchema.methods.generateAccesetoken=function(){
    return jwt.sign(
        {
            _id:this._id,
            email:this.email,
            username:this.username, 
            fullname:this.fullname,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRES_IN
        } 
    );
};
UserSchema.methods.generateRefreshtoken=function(){
    return jwt.sign(
        {
            _id:this._id
        },
        process.env.REFERESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRRESH_TOKEN_EXPIRES_IN
        } 
    )
}
export const User =mongoose.model("user",UserSchema)

