import {mailSender} from '../mail/mailSender.js';
import { model, Schema } from 'mongoose';
import emailTemplate from '../mail/verifcationTemplate.js';
import mongoose from 'mongoose';

const OTPSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 5,
  },
});

async function sendVerificationEmail(email, otp) {
  console.log('in send verification email');
  try {

    const response=await mailSender(email, 'verification Email', emailTemplate(otp));
    console.log(response+'email sent  ^^^^^^^^^^^^^^^^^ successfully');
  } catch (err) {
    console.log('error in sending email');
  }
}

// Send email after a new document is created
OTPSchema.pre('save', async function (next) {
  console.log('send email after new document created');
  console.log("&&& ",this.isNew);
  if (this.isNew) {
    console.log('email $$$$$$$$$$$$$$$$$$$$$$$sent');
    await sendVerificationEmail(this.email, this.otp);
  
  }
  console.log(this.email, this.otp);
  next();
});



export const otp = mongoose.models.otp || model("otp", OTPSchema);
