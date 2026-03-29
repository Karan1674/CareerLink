import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getAdminJobs, getAllJobs, getJobById, postJob, updateJob } from "../controllers/job.controller.js";

const router = express.Router();
router.post("/postJob",isAuthenticated, postJob ); //Completed
router.get("/getAllJobs",getAllJobs); //completed
router.get("/getAdminJobs", isAuthenticated,getAdminJobs); //Completed
router.get("/getJobById/:id", getJobById );  //completed
router.put("/updateJobById/:id", isAuthenticated, updateJob  );  //completed

export default router;
