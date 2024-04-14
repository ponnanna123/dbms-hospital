import db from "../server.js";

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

export const fetchDoctors = async (req, res, next) => {
  try {
    const { id1, id2 } = req.params;
    const query =
      "SELECT * FROM doctors WHERE hospital_id = ? AND department_id = ?";
    db.query(query, [id1, id2], (err, result) => {
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
