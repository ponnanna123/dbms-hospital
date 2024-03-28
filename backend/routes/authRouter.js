import express from "express";
import { signup } from "../controllers/authController.js";

const router = express();

router.post("/sign-up", signup);

export default router;
