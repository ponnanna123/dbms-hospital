import express from "express";
import {
  patientsignup,
  doctorsignup,
  signin,
  google,
  signout,
} from "../controllers/authController.js";

const router = express();

router.post("/sign-up/patient", patientsignup);
router.post("/sign-up/doctor", doctorsignup);
router.post("/sign-in", signin);
router.post("/google", google);
router.get("/sign-out", signout);

export default router;
