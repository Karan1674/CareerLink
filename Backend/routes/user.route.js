import express from "express";
import { login, logout, register, updateProfile } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { UploadData, singleUploadData } from "../middlewares/multer.js";

const router = express.Router();
router.post("/registerUser",singleUploadData,register); //completed
router.post("/loginUser", login);  // completed
router.get("/logoutUser", logout); // completed
router.put("/updateUser", UploadData,isAuthenticated, updateProfile);  // completed

export default router;