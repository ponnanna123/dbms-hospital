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

export const fetchAllInfo = (req, res, next) => {
  const departmentsQuery = "SELECT * FROM departments";
  db.query(departmentsQuery, (err, departments) => {
    if (err) {
      return next(err);
    }

    if (departments.length === 0) {
      return res.status(200).json({
        success: true,
        departments: [],
      });
    }

    let completedDepartments = 0;

    for (const department of departments) {
      const doctorsQuery = "SELECT * FROM doctors WHERE department_id = ?";
      db.query(doctorsQuery, [department.department_id], (err, doctors) => {
        if (err) {
          return next(err);
        }

        department.doctors = doctors;

        if (doctors.length === 0) {
          completedDepartments++;
          if (completedDepartments === departments.length) {
            return res.status(200).json({
              success: true,
              departments: departments,
            });
          }
        } else {
          let completedDoctors = 0;

          for (const doctor of department.doctors) {
            const hospitalQuery =
              "SELECT * FROM hospitals WHERE hospital_id = ?";
            db.query(hospitalQuery, [doctor.hospital_id], (err, hospitals) => {
              if (err) {
                return next(err);
              }

              doctor.hospital = hospitals[0];

              completedDoctors++;

              if (completedDoctors === department.doctors.length) {
                completedDepartments++;
                if (completedDepartments === departments.length) {
                  return res.status(200).json({
                    success: true,
                    departments: departments,
                  });
                }
              }
            });
          }
        }
      });
    }
  });
};
