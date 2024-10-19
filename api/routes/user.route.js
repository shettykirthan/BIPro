import express from "express";
import { uploadCSV, getUserCSVs } from "../controllers/userCSV.controller.js";
const router = express.Router();

// Route to upload CSV with userId in the URL
router.post("/:userId/upload-csv", uploadCSV);

// Route to get user's CSV files with userId in the URL
router.get("/:userId/csv-files", getUserCSVs);

export default router;
