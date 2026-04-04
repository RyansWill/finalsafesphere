import express from "express"
import { shouldBeAdmin } from "../controllers/test.controller.js"
import {verifyToken} from "../middleware/verifyToken.js"

const router = express.Router();

router.post("/should-Be-Admin", verifyToken, shouldBeAdmin);

export default router;