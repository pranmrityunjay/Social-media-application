import mongoose,{Schema} from "mongoose";

const postSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    firstName:{
        type: String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    location:{
        type:String,
        required:true,
    },
    description: String,
    picturePath:String,
    userPicturePath: String,
    likes:{
        type:Map,
        of: Boolean,
    },
    comments:{
        type:Array,
        default:[]

    }
},
{
    timestamps:true
})

export const Post = mongoose.model("Post", postSchema);
