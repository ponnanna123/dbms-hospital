import express from "express";
import { createAppointment } from "../controllers/appointmentController.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create/:id", verifyToken, createAppointment);

export default router;
