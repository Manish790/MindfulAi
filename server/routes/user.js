
import express from "express";
import {allUser, dataset, updatePersonality} from "../controller/user.js";
import { isAuthenticated } from "../middleware/auth.js";
import {personality} from "../controller/user.js";
import {allConfession} from "../controller/user.js";
import {ownConfession} from "../controller/user.js";
import { confessTo } from "../controller/user.js";
import { similarPersonality} from "../controller/user.js";
import {singleUser}  from "../controller/user.js";



const router = express.Router();

// Routes accessible without authentication


// Routes that require authentication
router.get("/dataset", dataset);
router.use(isAuthenticated);
router.post("/updatePersonality",updatePersonality);
router.get("/personality/:id",personality);
router.get("/allConfession",allConfession);
router.get("/ownConfession",ownConfession);
router.post("/confess",confessTo);
router.get("/similarPersonality",similarPersonality);
router.get("/allUser",allUser)
router.get("/singleUser/:id", singleUser);





export default router;
