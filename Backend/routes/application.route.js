import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { applyJob, getApplicants, getApplyJob, uppdateStatus } from "../controllers/application.controller.js";

const router = express.Router();
router.get("/applyApplication/:id",isAuthenticated, applyJob); //completed
router.get("/getApplyJob", isAuthenticated,getApplyJob); //completed
router.get("/getApplicants/:id", isAuthenticated,getApplicants); //Comleted
router.put("/updateApplication/:id", isAuthenticated, uppdateStatus); //completed

export default router;