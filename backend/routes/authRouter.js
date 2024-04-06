import express from "express";
import {
  patientsignup,
  doctorsignup,
  signin,
  google,
} from "../controllers/authController.js";

const router = express();

router.post("/sign-up/patient", patientsignup);
router.post("/sign-up/doctor", doctorsignup);
router.post("/sign-in", signin);
router.post("/google", google);

export default router;
