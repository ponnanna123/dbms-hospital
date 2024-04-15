import db from "../server.js";
import { errorHandler } from "../utils/error.js";

export const createAppointment = async (req, res, next) => {
  try {
    const {
      doctor_id,
      department_id,
      hospital_id,
      appointment_datetime,
      duration,
      description,
    } = req.body;

    const { id } = req.params;
    const status = "Scheduled";

    console.log(req.params);
    console.log(req.body);

    const query1 =
      "INSERT INTO appointments (account_id, doctor_id, department_id, hospital_id, appointment_datetime, status, duration, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

    db.query(
      query1,
      [
        id,
        doctor_id,
        department_id,
        hospital_id,
        appointment_datetime,
        status,
        duration,
        description,
      ],
      (error, result) => {
        if (error) {
          return next(
            errorHandler(206, "Error in creating a new appointment.")
          );
        }
        res.status(201).json({
          success: true,
          message: "Appointment created successfully",
          appointment: result.insertId,
        });
      }
    );
  } catch (error) {
    return next(error);
  }
};
