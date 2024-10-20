import express from "express";
import { uploadCSV, getUserCSVs } from "../controllers/userCSV.controller.js";
const router = express.Router();

router.post("/:userId/upload-csv", uploadCSV);
router.get("/:userId/csv-files", getUserCSVs);

export default router;
