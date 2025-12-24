import mongoose, {Schema} from "mongoose";

const subscriptionSchema = new Schema({
    subscriber:{
        type: Schema.Types.ObjectId,            //who is subscribing
        ref:"user",
    },
    channel:{
        type:Schema.Types.ObjectId,         //to whom subscriber is subscribing 
        ref:"user"
    }
},{timestamps:true})




export const subscription=mongoose.model("subscription",subscriptionSchema)