import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { updateUser, deletePatient } from "../controllers/userController.js";

const router = express.Router();

router.post("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deletePatient);

export default router;
