import mongoose from "mongoose";

const savedJobSchema = new mongoose.Schema({
    savedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    savedJobs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Job",
        }
    ]

}, { timestamps: true });

export const saveJob = mongoose.model("SavedJob", savedJobSchema);