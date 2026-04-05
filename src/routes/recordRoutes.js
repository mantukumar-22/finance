import express from "express";
import { createRecord, getRecords, updateRecord, deleteRecord} from "../controllers/recordController.js";
import { summary, monthlsummary } from "../controllers/summaryController.js";
import authenticateToken from "../middleware/auth.js";
import role from "../middleware/role.js";

const router = express.Router();

router.post("/create", authenticateToken,role("admin"), createRecord);
router.get("/", authenticateToken, role("admin", "viewer"), getRecords);
// router.get("/:id", authenticateToken, getRecordById);
router.put("/:id", authenticateToken, role("admin"), updateRecord);
router.delete("/:id", authenticateToken, role("admin"), deleteRecord);
router.get("/summary", authenticateToken, role("admin", "viewer"), summary);
router.get("/monthly-summary", authenticateToken, role("admin", "viewer"), monthlsummary);


export default router;