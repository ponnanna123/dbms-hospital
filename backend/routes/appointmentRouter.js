import express from "express";
import {
  createAppointment,
  getAppointments,
} from "../controllers/appointmentController.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create/:id", verifyToken, createAppointment);
router.get("/list/:id", verifyToken, getAppointments);

export default router;
