import express from "express";
import { homepage } from "../controllers/userController.js";

const router = express.Router();

router.get("/patients", homepage);

export default router;
