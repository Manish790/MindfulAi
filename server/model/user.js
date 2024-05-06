import mongoose, { Schema, model } from "mongoose";


const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
    email:{
      type:String,
      required:true,
      unique:true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    avatar: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    
      gender: {
        type: String,
        required: true,
      },
      educationQualification: {
        type: String,
        required: true,
      },
      personality:{
        type: Schema.Types.ObjectId,
        ref:'personality',
        required:true
      },
    
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.models.User || model("User", schema);
