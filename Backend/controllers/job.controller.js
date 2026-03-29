import { Job } from "../models/job.model.js";

export const postJob = async (req, res) => {
    try {
        const { title, discription, requirements, salary, location, experience, jobType, position, companyId } = req.body;
        const userId = req.id;

        if (!title || !discription || !requirements || !salary || !companyId || !location || !experience || !jobType || !position) {
            return res.status(400).json({
                message: "All fields are required",
                success: false,
            });
        }

        const newJob = new Job({
            title,
            discription,
            requirements: requirements.split(","),
            salary,
            location,
            jobType,
            position,
            experience,
            created_by: userId,
            company: companyId,
        });

        await newJob.save();

        return res.status(201).json({
            message: "Job posted successfully",
            job: newJob,
            success: true,
        });


    } catch (error) {
        console.error("Error posting job:", error);
        return res.status(500).json({
            message: "An error occurred while posting the job",
            success: false,
        });
    }
};


function escapeRegex(string) {
    return string.replace(/[$()*+.?[\\\]^{|}]/g, "\\$&");
}

export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const escapedKeyword = escapeRegex(keyword);

        const query = {
            $or: [
                { title: { $regex: escapedKeyword, $options: "i" } },
                { discription: { $regex: escapedKeyword, $options: "i" } },
                { jobType: { $regex: escapedKeyword, $options: "i" } },
                { position: { $regex: escapedKeyword, $options: "i" } },
                { salary: { $regex: escapedKeyword, $options: "i" } }, 
                { location: { $regex: escapedKeyword, $options: "i" } },
            ],
        }


        const jobs = await Job.find(query).populate({ path: "company" }).sort({ createdAt: -1 })

        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not Found",
                success: false,
            });
        }

        return res.status(200).json({
            message: "Jobs fetched successfully",
            jobs,
            success: true,
        });

    } catch (error) {
        console.error("Error fetching jobs:", error);
        return res.status(500).json({
            message: "An error occurred while fetching jobs",
            success: false,
        });
    }
}



export const getJobById = async (req, res) => {
    try {
        const { id } = req.params;

        const job = await Job.findById(id)
            .populate('company').populate('applications')

        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false,
            });
        }

        return res.status(200).json({
            message: "Job fetched successfully",
            job,
            success: true,
        });

    } catch (error) {
        console.error("Error fetching job by ID:", error);
        return res.status(500).json({
            message: "An error occurred while fetching the job",
            success: false,
        });
    }
};


export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;

        const jobs = await Job.find({ created_by: adminId }).populate('company').sort({ createdAt: -1 });


        if (!jobs || jobs.length === 0) {
            return res.status(404).json({
                message: "No jobs found for this admin",
                success: false,
            });
        }

        return res.status(200).json({
            message: "Jobs fetched successfully",
            jobs,
            success: true,
        });

    } catch (error) {
        console.error("Error fetching admin jobs:", error);
        return res.status(500).json({
            message: "An error occurred while fetching jobs",
            success: false,
        });
    }
};


export const updateJob = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, discription, requirements, salary, location, experience, jobType, position, companyId } = req.body;

        const job = await Job.findById(id);

        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false,
            });
        }

        job.title = title;
        job.discription = discription;
        job.requirements = requirements.split(",");
        job.salary = salary;
        job.location = location;
        job.jobType = jobType;
        job.position = position;
        job.experience = experience;
        job.company = companyId;


        await job.save();

        return res.status(200).json({
            message: "Job updated successfully",
            job,
            success: true,
        });

    } catch (error) {
        console.error("Error updating job:", error);
        return res.status(500).json({
            message: "An error occurred while updating the job",
            success: false,
        });
    }
};
