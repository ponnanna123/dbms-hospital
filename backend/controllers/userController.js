import db from "../server.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const homepage = (req, res) => {
  const query = "SELECT * FROM patients";

  db.query(query, (error, data) => {
    try {
      res.json(data);
    } catch (error) {
      console.log(error);
    }
  });
};

export const deletePatient = async (req, res, next) => {
  const { id } = req.params;
  if (req.user.id != id) {
    return next(errorHandler(401, "You can only delete your own account!"));
  }

  try {
    const procedure = `
    CREATE PROCEDURE IF NOT EXISTS delete_user_and_related_info(IN user_id INT, IN user_email VARCHAR(45))
    BEGIN
      DELETE FROM appointments WHERE account_id = user_id;
      DELETE FROM patients WHERE email = user_email;
      DELETE FROM accounts WHERE account_id = user_id;
    END
  `;

    db.query(procedure, (err) => {
      if (err) return next(err);

      db.query(
        "SELECT email FROM accounts WHERE account_id = ?",
        [id],
        (err, user) => {
          if (err) return next(errorHandler(400, "Invalid data"));
          const userEmail = user[0].email;

          db.query(
            "CALL delete_user_and_related_info(?, ?)",
            [id, userEmail],
            (err) => {
              if (err) return next(err);
              res
                .status(200)
                .json({ success: true, message: "User deleted successfully" });
            }
          );
        }
      );
    });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  const { id } = req.params;
  if (req.user.id != id) {
    return next(errorHandler(401, "You can only update your own account!"));
  }

  try {
    const updatedValues = {};

    if (req.body.username) updatedValues.username = req.body.username;
    if (req.body.email) updatedValues.email = req.body.email;
    if (req.body.profile_url) updatedValues.profile_url = req.body.profile_url;
    if (req.body.password) {
      const hashedPassword = await bcryptjs.hash(req.body.password, 10);
      updatedValues.password = hashedPassword;
    }

    const query1 = `UPDATE accounts SET ? WHERE account_id = ?`;

    const updatedUser = db.query(
      query1,
      [updatedValues, req.params.id],
      (error, data) => {
        try {
          if (error) {
            return next(errorHandler(400, "Invalid data"));
          }
        } catch (error) {
          next(error);
        }
        res.status(200).send(updatedUser.values);
      }
    );
    console.log(updatedUser.values);
  } catch (error) {
    next(error);
  }
};
