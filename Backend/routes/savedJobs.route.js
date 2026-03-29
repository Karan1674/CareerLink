import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { changeSavedjobs, fetchSavedjob, save } from "../controllers/savedJobs.controller.js";

const router = express.Router();
router.post("/saveJob", isAuthenticated, save); //Completed
router.get("/fetchSavedJobs", isAuthenticated, fetchSavedjob); //Completed
router.put("/changeSavedJob", isAuthenticated, changeSavedjobs); //Completed

export default router;