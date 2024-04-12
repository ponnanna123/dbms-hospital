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

export const deleteUser = (req, res, next) => {};

export const updateUser = async (req, res, next) => {
  if (req.user.id != req.params.id) {
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
