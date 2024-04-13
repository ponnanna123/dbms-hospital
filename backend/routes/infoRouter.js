import express from "express";
import {
  fetchHospitals,
  fetchSpecializations,
  fetchDepartments,
  fetchDoctorsByHospital,
} from "../controllers/infoController.js";

const router = express.Router();

router.get("/specializations", fetchSpecializations);
router.get("/departments", fetchDepartments);
router.get("/hospitals", fetchHospitals);
router.get("/doctors/:id", fetchDoctorsByHospital);

export default router;
