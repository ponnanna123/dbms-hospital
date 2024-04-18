import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  updateUser,
  deletePatient,
  fetchUser,
  deleteDoctor,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/fetch/:id", verifyToken, fetchUser);
router.put("/update/:id", verifyToken, updateUser);
router.delete("/delete/patient/:id", verifyToken, deletePatient);
router.delete("/delete/doctor/:id", verifyToken, deleteDoctor);

export default router;
