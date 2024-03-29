import express from "express";
import { signup, signin } from "../controllers/authController.js";

const router = express();

router.post("/sign-up", signup);
router.post("/sign-in", signin);

export default router;
