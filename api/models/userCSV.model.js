import mongoose from "mongoose";


const userCSVSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users", 
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

const UserCSV = mongoose.model("UserCSV", userCSVSchema);

export default UserCSV;
