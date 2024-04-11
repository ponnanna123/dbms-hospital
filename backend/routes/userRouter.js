import express from "express";
import {
  homepage,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/patients", homepage);
router.post("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);

export default router;
