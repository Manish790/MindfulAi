import { compare } from "bcrypt";
import { User } from "../model/user.js";
import jwt from "jsonwebtoken";
import { personality as Question } from "../model/personality.js";
import { cookieOptions, uploadFilesToCloudinary } from "../utils/features.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import optGenerator from "otp-generator";
import { otp } from "../model/otp.js";
dotenv.config();

// Create a new user and save it to the database and save token in cookie
const newUser = async (req, res) => {
  console.log(req.body);
  
  try {
    const {
      name,
      username,
      email,
      password,
      bio,
      gender,
      educationQualification,
    } = req.body;

    // console.log(req.body);

    const file = req.file;
    // console.log(file);

    if (!file) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image",
      });
    }

    const userExists = await User.findOne({ email: email });
    if (userExists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }
    // console.log(userExists);

    if (userExists?.username == username)
      return res
        .status(400)
        .json({ success: false, message: "username already exists" });

    const otpData = await otp
      .findOne({ email })
      .sort({ createdAt: -1 })
      .limit(1);
    if (!otpData) {
      return res.status(400).json({ error: "OTP not found" });
    } else if (otpData.otp !== req.body.otp) {
      return res.status(400).json({ error: "OTP not matched" });
    }

    const result = await uploadFilesToCloudinary([file]);

    if (!result)
      return res
        .status(400)
        .json({ success: false, message: "Image upload failed" });
    const avatar = {
      public_id: result[0].public_id,
      url: result[0].url,
    };

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log("pass1");
    const temp = await Question.create({});
    // console.log(temp);

    const user = await User.create({
      name,
      bio,
      email,
      username,
      gender: gender,
      educationQualification,
      password: hashedPassword,
      avatar,
      personality: temp._id,
    });

    temp.userId = user._id;
    temp.userGender = user.gender;
    temp.save();

    // console.log("pass2");

    return res.status(201).json({
      success: true,
      message: "User created successfully",
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};

// Login user and save token in cookie
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email })
      .select("+password")
      .populate("personality");
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or Password" });

    const isMatch = await compare(password, user.password);

    if (!isMatch)
      return res.status(400).json({
        success: false,
        message: "Invalid email or Password",
      });
    user.password = undefined;

    const token = jwt.sign(
      { _id: user._id, gender: user.gender },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRE,
      }
    );

    return res.cookie("rocket-token", token, cookieOptions).status(200).json({
      data: user,
      success: true,
      message: "Logged in successfully",
    });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};

const getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req._id);
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};

//logout
const logout = async (req, res) => {
  try {
    return res
      .status(200)
      .cookie("rocket-token", "", { ...cookieOptions, maxAge: 0 })
      .json({
        success: true,
        message: "Logged out successfully",
      });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};

// send otp
const sendOtp = async (req, res) => {
  try {
    //check if user already exists
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "user already exists" });
    }
    //generate otp
    let gotp = optGenerator.generate(6, {
      upperCase: false,
      specialChars: false,
    });
    //check if otp already exists
    let otpData = await otp.findOne({ otp: gotp });

    while (otpData) {
      gotp = optGenerator.generate(6, {
        upperCase: false,
        specialChars: false,
      });
      otpData = await otp.findOne({ otp: gotp });
      console.log("infitie otp loop");
    }
    //create otp
    const response = await otp.create({
      email,
      otp: gotp,
    });

    console.log(response + " *** " + gotp);
    res.status(200).json({ message: "otp sent successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ error: err.message, message: "error in send otp" });
  }
};

export { getMyProfile, login, logout, newUser, sendOtp };
