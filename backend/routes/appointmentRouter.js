import express from "express";
import {
  createAppointment,
  deleteAppointment,
  getAppointmentsDoctor,
  getAppointmentsPatient,
  updateStatus,
} from "../controllers/appointmentController.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create/:id", verifyToken, createAppointment);
router.get("/patient/:id", verifyToken, getAppointmentsPatient);
router.get("/doctor/:id", verifyToken, getAppointmentsDoctor);
router.get("/delete/:id", verifyToken, deleteAppointment);
router.put("/update/status/:id", verifyToken, updateStatus);

export default router;
