import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  updateUser,
  deletePatient,
  fetchUser,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/fetch/:id", verifyToken, fetchUser);
router.put("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deletePatient);

export default router;
