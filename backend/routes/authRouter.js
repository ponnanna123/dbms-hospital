import express from "express";
import { signup } from "../controllers/authController.js";

const router = express();

router.post("/add-patient", signup);

export default router;
