import express from 'express';
import { deleteTrack, createTrack, getTrack, getTracks, updateTrack } from '../controllers/track.controller.js';


const router = express.Router();

router.post("/create-track", createTrack);
router.get("/get-Tracks", getTracks);
router.post("/get-Track", getTrack);
router.put("/update-Track", updateTrack);
router.delete("/delete-Track/:id", deleteTrack);

export default router;