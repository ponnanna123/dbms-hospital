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
