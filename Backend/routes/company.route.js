import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getCompany, getCompanyById, registerCompany, updateCompany } from "../controllers/company.controller.js";
import { singleUploadData } from "../middlewares/multer.js";

const router = express.Router();
router.post("/register",isAuthenticated, registerCompany); //completed
router.get("/getCompany", isAuthenticated,getCompany);  //completed
router.get("/getCompany/:id", isAuthenticated,getCompanyById); //completed
router.put("/updateCompany/:id",singleUploadData, isAuthenticated, updateCompany); //completed

export default router;