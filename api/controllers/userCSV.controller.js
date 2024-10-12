import User from "../models/user.model.js";
import UserCSV from "../models/userCSV.model.js";

// Controller to handle CSV uploads
export const uploadCSV = async (req, res) => {
    try {
        const { userId, fileName, csvData } = req.body;

        
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        
        // Create and save the new CSV record
        const userCSV = new UserCSV({
            user_id: userId,
            fileName,
            csvData,
        });
        await userCSV.save();

        res.status(201).json({ success: true, message: "CSV uploaded successfully", userCSV });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error uploading CSV", error });
    }
};

// Controller to fetch CSVs for a user
export const getUserCSVs = async (req, res) => {
    try {
        const { userId } = req.params;

        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Retrieve all CSVs for the user
        const csvFiles = await UserCSV.find({ user_id: userId });

        res.status(200).json({
            success: true,
            message: "CSV files retrieved successfully",
            csvFiles
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error retrieving CSV files",
            error
        });
    }
};
