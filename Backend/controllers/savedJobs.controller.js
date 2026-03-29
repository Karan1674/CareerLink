import { Job } from "../models/job.model.js";
import { saveJob } from "../models/savedJobs.model.js";

export const save = async (req, res) => {
    try {
        const userId = req.id;
        const { jobId } = req.body;

        if (!jobId) {
            return res.status(400).json({
                message: "Job ID is required",
                success: false,
            });
        }

        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false,
            });
        }

        const existSaved = await saveJob.findOne({
            savedBy: userId,
            savedJobs: jobId,
        });

        if (existSaved) {
            return res.status(400).json({
                message: "You have already saved this job",
                success: false,
            });
        }

        await saveJob.findOneAndUpdate(
            { savedBy: userId },
            { $addToSet: { savedJobs: jobId } },
            { upsert: true, new: true }
        );

        return res.status(200).json({
            message: "Job saved successfully",
            success: true,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "An error occurred while saving the job",
            success: false,
        });
    }
};


export const fetchSavedjob = async (req, res) => {
    try {

        const userId = req.id;

        const savedJobs = await saveJob.findOne({
            savedBy: userId,
        }).populate({
            path: "savedJobs",
            populate: {
                path: "company"
            }
        });

        if(!savedJobs){
            return res.status(200).json({
                success: false
            });
        }

        return res.status(200).json({
            savedJobs,
            success: true
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "An error occurred while fetching the saved job",
            success: false,
        });
    }
}

export const changeSavedjobs = async (req, res) => {
    try {

        const userId = req.id;

        const { jobId } = req.body;
   
        if (!jobId) {
            return res.status(400).json({
                message: "Job ID is required",
                success: false,
            });
        }

        const existSaved = await saveJob.findOne({
            savedBy: userId,
            savedJobs: jobId,
        });

        if (!existSaved) {
            return res.status(400).json({
                message: "You havn't save this job",
                success: false,
            });
        }
        await saveJob.findOneAndUpdate(
            { savedBy: userId },
            { $pull: { savedJobs: jobId } },
            { new: true }
        );

        return res.status(200).json({
            message: "Job unsaved successfully",
            success: true,
        });


    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "An error occurred while  unsaving the job",
            success: false,
        });
    }
}
