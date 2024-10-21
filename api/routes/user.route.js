import express from "express";
import { uploadCSV, getUserCSVs,getSingleUserCSV } from "../controllers/userCSV.controller.js";
const router = express.Router();

router.post("/:userId/upload-csv", uploadCSV);
router.get("/:userId/csv-files", getUserCSVs);
router.get("/:userId/csv/:csvId", getSingleUserCSV);

export default router;
