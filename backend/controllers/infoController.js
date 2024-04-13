import db from "../server.js";

export const fetchSpecializations = async (req, res, next) => {
  try {
    const query = "SELECT * FROM specializations";
    db.query(query, (err, result) => {
      if (err) {
        return next(err);
      }
      return res.status(200).json({
        success: true,
        specializations: result,
      });
    });
  } catch (error) {
    next(error);
  }
};

export const fetchDepartments = async (req, res, next) => {
  try {
    const query = "SELECT * FROM departments";
    db.query(query, (err, result) => {
      if (err) {
        return next(err);
      }
      return res.status(200).json({
        success: true,
        departments: result,
      });
    });
  } catch (error) {
    next(error);
  }
};

export const fetchHospitals = async (req, res, next) => {
  try {
    const query = "SELECT * FROM hospitals";
    db.query(query, (err, result) => {
      if (err) {
        return next(err);
      }
      return res.status(200).json({
        success: true,
        hospitals: result,
      });
    });
  } catch (error) {
    next(error);
  }
};

export const fetchDoctorsByHospital = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id);
    const query = "SELECT * FROM doctors WHERE hospital_id = ?";
    db.query(query, [id], (err, result) => {
      if (err) {
        return next(err);
      }
      return res.status(200).json({
        success: true,
        doctors: result,
      });
    });
  } catch (error) {
    next(error);
  }
};
