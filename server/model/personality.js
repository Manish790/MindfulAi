import mongoose from 'mongoose';
import  { Schema,model } from 'mongoose';


const personalityQuestions = new Schema({
mark:{
    type:Boolean,
    default:false
  },
  userId:{type:String,default:"NA"},
  userGender:{type:String,default:"Male"},
  adventurous: { type: Number, min: 1, max: 10, default: 1 },
  senseOfHumor: { type: Number, min: 1, max: 10, default: 1 },
  communicationImportance: { type: Number, min: 1, max: 10, default: 1 },
  introvertedVsExtroverted: { type: Number, min: 1, max: 10, default: 1 },
  spontaneity: { type: Number, min: 1, max: 10, default: 1 },
  foodAdventurousness: { type: Number, min: 1, max: 10, default: 1 },
  neatness: { type: Number, min: 1, max: 10, default: 1 },
  aloneTimeVsTimeWithOthers: { type: Number, min: 1, max: 10, default: 1 },
  opennessToNewActivities: { type: Number, min: 1, max: 10, default: 1 },
  honestyImportance: { type: Number, min: 1, max: 10, default: 1 }
});

export const personality = mongoose.models.personality || model("personality", personalityQuestions);
