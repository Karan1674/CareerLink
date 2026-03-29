import { Company } from "../models/company.model.js";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "../utils/cloudinary.js";

export const registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body;

        if (!companyName) {
            return res.status(400).json({
                message: "Company Name is Required ",
                success: false,
            });
        }

        const existingCompany = await Company.findOne({ companyName });
        if (existingCompany) {
            return res.status(400).json({
                message: "Company with this name already exists.",
                success: false,
            });
        }

        const company = new Company({
            companyName,
            userId: req.id
        });

        await company.save();

        return res.status(201).json({
            message: "Company registered successfully.",
            success: true,
            company
        });

    } catch (error) {
        console.error("Error in registerCompany:", error);
        return res.status(500).json({
            message: "An error occurred while registering the company.",
            success: false,
        });
    }
};

export const getCompany = async (req, res) => {
    try {
        const userId = req.id;

        const companies = await Company.find({ userId }).sort({ createdAt: -1 });

        if (!companies || companies.length === 0) {
            return res.status(404).json({
                message: "No companies found for this user.",
                success: false,
            });
        }

        return res.status(200).json({
            message: "Companies retrieved successfully.",
            success: true,
            companies,
        });

    } catch (error) {
        console.error("Error in getCompany:", error);
        return res.status(500).json({
            message: "An error occurred while retrieving companies.",
            success: false,
        });
    }
};


export const getCompanyById = async (req, res) => {
    try {
        const { id } = req.params;

        const company = await Company.findById(id);

        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false,
            });
        }

        return res.status(200).json({
            message: "Company retrieved successfully.",
            success: true,
            company,
        });

    } catch (error) {
        console.error("Error in getCompanyById:", error);
        return res.status(500).json({
            message: "An error occurred while retrieving the company.",
            success: false,
        });
    }
};


export const updateCompany = async (req, res) => {
    try {
        const { companyName, email, discription, website, location, prefileId } = req.body;
        const file = req.file;

        if (!companyName && !email && !discription && !website && !location && !file) {
            return res.status(404).json({
                message: "Please fill any field to update.",
                success: false,
            });
        }
    
        const updateData = { companyName, discription, website, location };

        if (file) {
            const fileUri = getDataUri(file);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
                public_id: prefileId,
                overwrite: true
            });

            if (cloudResponse) {
               const logo = cloudResponse.secure_url;
               updateData.logo = logo;

            }
        }
       
        const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false,
            });
        }

        return res.status(200).json({
            message: "Company updated successfully.",
            success: true,
            company,
        });


    } catch (error) {
        console.error("Error in updateCompany:", error);
        return res.status(500).json({
            message: "An error occurred while updating the company.",
            success: false,
        });
    }
}