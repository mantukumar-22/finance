import express from "express";
import { createRecord, getRecords, updateRecord, deleteRecord} from "../controllers/recordController.js";
import { summary } from "../controllers/summaryController.js";
import authenticateToken from "../middleware/auth.js";

const router = express.Router();

router.post("/create", authenticateToken, createRecord);
router.get("/", authenticateToken, getRecords);
// router.get("/:id", authenticateToken, getRecordById);
router.put("/:id", authenticateToken, updateRecord);
router.delete("/:id", authenticateToken, deleteRecord);
router.get("/summary", authenticateToken, summary);


export default router;