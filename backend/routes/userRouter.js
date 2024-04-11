import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  homepage,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/patients", homepage);
router.post("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", deleteUser);

export default router;
