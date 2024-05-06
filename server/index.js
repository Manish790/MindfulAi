import dotenv from 'dotenv';
import express from 'express';
import userRoute from "./routes/auth.js";
import cors from 'cors';
import { connectDB } from './utils/features.js';
import cookieParser from 'cookie-parser';
import { v2 as cloudinary } from "cloudinary";
import other from './routes/user.js';

const app = express();
app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true // Allow sending cookies with the request
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

dotenv.config();
const PORT = process.env.PORT || 5000;
connectDB(process.env.MONGO_URI);

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

app.use('/api/v1/user',userRoute);
app.use('/api/v1/other',other)

app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`);
});
