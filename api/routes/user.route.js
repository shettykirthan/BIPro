import express from "express";
import { uploadCSV, getUserCSVs } from "../controllers/userCSV.controller.js";
const router = express.Router();

// Route to upload CSV
router.post("/upload-csv", uploadCSV);

// Route to get user's CSV files
router.get("/:userId/csv-files", getUserCSVs);

export default router;
