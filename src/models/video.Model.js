import mongoose ,{schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"; 

const videoschema =new schema(
    {
        videofile:{
            type:String,  //couldnary url
            required:true,
        },
        thumbnail:{
            type:String, //couldnary url
            required:true,
        },
        owner:{
            type:schema.Types.ObjectId,
            ref:"user",
            required:true,
        },
        title:{
            type:String,
            required:true,
        },
        description:{
            type:String,
            required:true,
        },
        duration:{
            type:Number,
            required:true,  
        },
        views:{
            type:Number,
            default:0,
        },
        ispublished:{

            type:Boolean,
            default:true,
        }
    },
    {timestamps:true}
)

videoschema.plugin(mongooseAggregatePaginate); 
export const Video =mongoose.model("video",videoschema)