import express from "express";
import {
  patientsignup,
  doctorsignup,
  signin,
} from "../controllers/authController.js";

const router = express();

router.post("/sign-up/patient", patientsignup);
router.post("/sign-up/patient", doctorsignup);
router.post("/sign-in", signin);

export default router;
