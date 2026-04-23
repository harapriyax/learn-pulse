import { v2 as cloudinary } from 'cloudinary';
import dotenv from "dotenv";
import fs from "fs";
dotenv.config({});

cloudinary.config({
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    cloud_name: process.env.CLOUD_NAME,
});

export const uploadMedia = async (file) => {
    try {
        const uploadResponse = await cloudinary.uploader.upload(file, {
            resource_type: "auto"
        });
        // Clean up temp file after successful upload
        if (fs.existsSync(file)) {
            fs.unlinkSync(file);
        }
        return uploadResponse;
    } catch (error) {
        // Clean up temp file even on error
        if (fs.existsSync(file)) {
            fs.unlinkSync(file);
        }
        console.log("Cloudinary upload error:", error);
        throw error;
    }
}

export const deleteMediaFromCloudinary = async (publicId) => {
    try {
        await cloudinary.uploader.destroy(publicId);
    } catch (error) {
        console.log("Cloudinary delete error:", error);
    }
};

export const deleteVideoFromCloudinary = async (publicId) => {
    try {
        await cloudinary.uploader.destroy(publicId, { resource_type: "video" });
    } catch (error) {
        console.log("Cloudinary video delete error:", error);
    }
}