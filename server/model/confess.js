import mongoose from 'mongoose';
import  { Schema,model } from 'mongoose';


const confessSchema = new Schema({
    description:{
        type:String,
        required:true
    },
      confessBy:{
        type:Schema.Types.ObjectId,
        ref:'user',
        required:true
        },
        confessTo:{
            type:Schema.Types.ObjectId,
            ref:'user',
            required:true
        }
    
},{timestamps:true});


export const confession = mongoose.models.confessSchema || model("confession",confessSchema);
