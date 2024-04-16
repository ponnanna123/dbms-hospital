import express from "express";
import {
  createAppointment,
  deleteAppointment,
  getAppointments,
} from "../controllers/appointmentController.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create/:id", verifyToken, createAppointment);
router.get("/list/:id", verifyToken, getAppointments);
router.get("/delete/:id", verifyToken, deleteAppointment);

export default router;
