import express from "express";
import {
  fetchHospitals,
  fetchSpecializations,
  fetchDepartments,
} from "../controllers/infoController.js";

const router = express.Router();

router.get("/specializations", fetchSpecializations);
router.get("/departments", fetchDepartments);
router.get("/hospitals", fetchHospitals);

export default router;
