import db from "../server.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";

export const patientsignup = async (req, res, next) => {
  const {
    email,
    password,
    first_name,
    last_name,
    date_of_birth,
    gender,
    address,
    phone_number,
    type,
  } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const username =
    first_name.toLowerCase() +
    last_name.toLowerCase() +
    Math.random().toString(10).slice(-4);

  const query1 =
    "INSERT INTO patients (first_name, last_name, date_of_birth, gender, address, phone_number, email) VALUES (?, ? ,?, ?, ?, ?, ?)";
  const query2 =
    "INSERT INTO accounts (username, email, password, type) VALUES (?, ?, ? ,?)";

  db.query(
    query1,
    [
      first_name,
      last_name,
      date_of_birth,
      gender,
      address,
      phone_number,
      email,
    ],
    (error, data) => {
      if (error) {
        return next(errorHandler(510, "Error creating patient"));
      }

      db.query(
        query2,
        [username, email, hashedPassword, type],
        (error, data) => {
          if (error) {
            return next(errorHandler(520, "Error creating account"));
          }
          res.status(201).send({
            message: "Patient account created successfully.",
          });
        }
      );
    }
  );
};

export const doctorsignup = async (req, res, next) => {
  const {
    email,
    password,
    first_name,
    last_name,
    phone_number,
    specialization_id,
    department_id,
    hospital_id,
    gender,
    type,
  } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const username =
    first_name.toLowerCase() +
    last_name.toLowerCase() +
    Math.random().toString(10).slice(-4);

  const query1 =
    "INSERT INTO doctors (first_name, last_name, specialization_id, department_id, hospital_id, gender, phone_number, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  const query2 =
    "INSERT INTO accounts (username, email, password, type) VALUES (?, ?, ? ,?)";

  db.query(
    query1,
    [
      first_name,
      last_name,
      specialization_id,
      department_id,
      hospital_id,
      gender,
      phone_number,
      email,
    ],
    (error, data) => {
      if (error) {
        return next(errorHandler(510, "Error creating doctor"));
      }

      db.query(
        query2,
        [username, email, hashedPassword, type],
        (error, data) => {
          if (error) {
            return next(errorHandler(520, "Error creating account"));
          }
          res.status(201).send({
            message: "Doctor account created successfully.",
          });
        }
      );
    }
  );
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  const query = "SELECT * FROM accounts WHERE email = ?";

  db.query(query, [email], (error, data) => {
    if (error) {
      return next(errorHandler(505, "Error fetching account"));
    }

    if (data.length === 0) {
      return next(errorHandler(404, "Account not found"));
    }

    const account = data[0];

    if (!bcryptjs.compareSync(password, account.password)) {
      return next(errorHandler(401, "Invalid password"));
    }

    const token = jwt.sign({ id: account.account_id }, process.env.JWT_KEY);
    const { password: pass, ...rest } = account;
    res
      .cookie("access_token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 24 * 60 * 60 * 365),
      })
      .status(200)
      .send(rest);
  });
};

export const google = async (req, res) => {
  try {
    const { email, name, type, profile_url } = req.body;
    const query = "SELECT * FROM accounts WHERE email = ?";

    db.query(query, [email], (error, data) => {
      if (error) {
        return next(errorHandler(505, "Error fetching account"));
      }

      if (data.length) {
        const account = data[0];
        const token = jwt.sign({ id: account.account_id }, process.env.JWT_KEY);
        const { password: pass, ...rest } = account;
        res
          .cookie("access_token", token, {
            httpOnly: true,
            expires: new Date(Date.now() + 24 * 60 * 60 * 365),
          })
          .status(200)
          .send(rest);
      } else {
        const generatedPassword =
          Math.random().toString(36).slice(-8) +
          Math.random().toString(36).slice(-8);
        const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
        const username =
          name.split(" ").join("").toLowerCase() +
          Math.random().toString(10).slice(-4);
        db.query(
          "INSERT INTO accounts (email, username, password, type, profile_url) VALUES (?, ?, ?, ?, ?)",
          [email, username, hashedPassword, type, profile_url],
          (insertError) => {
            if (insertError) {
              return next(errorHandler(520, "Error inserting account"));
            }
            db.query(
              "SELECT LAST_INSERT_ID() as account_id",
              (lastIdError, result1) => {
                if (lastIdError) {
                  next(errorHandler(506, "Error fetching account id"));
                }

                const account_id = result1[0].account_id;
                db.query(
                  "SELECT * FROM accounts WHERE account_id = ?",
                  [account_id],
                  (selectError, result2) => {
                    if (selectError) {
                      return next(errorHandler(505, "Error fetching account"));
                    }

                    const account = result2[0];
                    const token = jwt.sign(
                      { id: account_id },
                      process.env.JWT_KEY
                    );
                    const { password: pass, ...rest } = account;
                    res
                      .cookie("access_token", token, {
                        httpOnly: true,
                        expires: new Date(Date.now() + 24 * 60 * 60 * 365),
                      })
                      .status(200)
                      .send(rest);
                  }
                );
              }
            );
          }
        );
      }
    });
  } catch (error) {
    return next(errorHandler(500, "Internal Server Error"));
  }
};

export const signout = async (req, res) => {
  try {
    res.clearCookie("access_token").status(200).send({
      message: "User has been logged out successfully.",
    });
  } catch (error) {
    return next(error);
  }
};
