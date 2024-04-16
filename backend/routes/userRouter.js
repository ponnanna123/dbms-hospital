import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  homepage,
  updateUser,
  deletePatient,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/patients", homepage);
router.post("/update/:id", verifyToken, updateUser);
router.get("/delete/:id", verifyToken, deletePatient);

export default router;
