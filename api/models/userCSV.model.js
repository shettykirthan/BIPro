// models/userCSV.model.js
import mongoose from "mongoose";

const userCSVSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", 
            required: true
        },
        fileName: {
            type: String,
            required: true
        },
        csvData: {
            type: Array,
            required: true
        }
    },
    { timestamps: true }
);

userCSVSchema.index({ user_id: 1 });

const UserCSV = mongoose.model("UserCSV", userCSVSchema);

export default UserCSV;