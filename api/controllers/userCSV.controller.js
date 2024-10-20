import User from "../models/user.model.js";
import UserCSV from "../models/userCSV.model.js";


export const uploadCSV = async (req, res) => {
    try {
        const { userId } = req.params; 
        const { fileName, csvData } = req.body;


        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const userCSV = new UserCSV({
            user_id: userId,
            fileName,
            csvData
        });

        await userCSV.save();

        res.status(201).json({
            success: true,
            message: "CSV uploaded successfully",
            data: {
                id: userCSV._id,
                fileName: userCSV.fileName
            }
        });
    } catch (error) {
        console.error("Upload Error:", error);
        res.status(500).json({
            success: false,
            message: "Error uploading CSV",
            error: error.message
        });
    }
};


export const getUserCSVs = async (req, res) => {
    try {
        const { userId } = req.params; 

    
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const csvFiles = await UserCSV.find({ user_id: userId });

        res.status(200).json({
            success: true,
            csvFiles
        });
    } catch (error) {
        console.error("Get CSVs Error:", error);
        res.status(500).json({
            success: false,
            message: "Error retrieving CSV files",
            error: error.message
        });
    }
};
