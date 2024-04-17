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

export const getAppointmentsPatient = async (req, res, next) => {
  try {
    const { id } = req.params;

    const query1 = `
      SELECT * FROM appointments a
      JOIN hospitals h ON a.hospital_id = h.hospital_id
      JOIN doctors d ON a.doctor_id = d.doctor_id
      WHERE a.account_id = ? ORDER BY a.appointment_datetime
    `;

    db.query(query1, [id], (error, result) => {
      if (error) {
        return next(errorHandler(206, "Error fetching appointments."));
      }
      res.status(200).json({
        success: true,
        appointments: result,
      });
    });
  } catch (error) {
    return next(error);
  }
};

export const getAppointmentsDoctor = async (req, res, next) => {
  try {
    const { id } = req.params;

    const query1 = "SELECT * FROM accounts WHERE account_id = ?";
    db.query(query1, [id], (error, result) => {
      if (error) {
        return next(errorHandler(206, "Error fetching email."));
      }

      const email = result[0].email;

      const query2 = `
        SELECT ap.*, p.* FROM appointments ap
        JOIN doctors d ON ap.doctor_id = d.doctor_id
        JOIN accounts ac ON ap.account_id = ac.account_id
        JOIN patients p ON ac.email = p.email
        WHERE d.email = ? ORDER BY ap.appointment_datetime DESC
      `;
      db.query(query2, [email], (error, result) => {
        if (error) {
          return next(errorHandler(206, "Error fetching appointments."));
        }
        res.status(200).json({
          success: true,
          appointments: result,
        });
      });
    });
  } catch (error) {
    return next(error);
  }
};

export const deleteAppointment = async (req, res, next) => {
  try {
    const { id } = req.params;

    const query1 = "DELETE FROM appointments WHERE appointment_id = ?";

    db.query(query1, [id], (error, result) => {
      if (error) {
        return next(errorHandler(206, "Error deleting appointment."));
      }
      res.status(200).json({
        success: true,
        message: "Appointment deleted successfully",
      });
    });
  } catch (error) {
    return next(error);
  }
};

export const updateStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const query1 =
      "UPDATE appointments SET status = ? WHERE appointment_id = ?";

    db.query(query1, [status, id], (error, result) => {
      if (error) {
        return next(errorHandler(206, "Error updating status."));
      }
      res.status(200).json({
        success: true,
        message: "Status updated successfully",
      });
    });
  } catch (error) {
    return next(error);
  }
};
