import express from "express";
import { homepage, updateUser } from "../controllers/userController.js";

const router = express.Router();

router.get("/patients", homepage);
router.post("/update/:id", updateUser);

export default router;
