import jwt from "jsonwebtoken";

import { User } from "../model/user.js";

const isAuthenticated = async(req, res, next) => {
    try{

  const token = req.cookies["rocket-token"];
  if (!token)
    return res.status(401).json({ success: false, message: "Unauthorized" });

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req._id = decodedData._id;
  req.gender=decodedData.gender;

  next();
    }catch(err){
        return res.status(500).json({success:false,message:"Something went wrong"});
    }
};






  

export { isAuthenticated };
