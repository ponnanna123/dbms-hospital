import express from "express";
import {
  fetchHospitals,
  fetchDepartments,
  fetchDoctors,
  fetchAllInfo,
} from "../controllers/infoController.js";

const router = express.Router();

router.get("/departments", fetchDepartments);
router.get("/hospitals", fetchHospitals);
router.get("/doctors/:id1/:id2", fetchDoctors);
router.get("/all", fetchAllInfo);

export default router;
