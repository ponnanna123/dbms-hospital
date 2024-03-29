import db from "../server.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
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
    specialization,
  } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);

  const query1 =
    "INSERT INTO patients (first_name, last_name, date_of_birth, gender, address, phone_number, email) VALUES (?, ? ,?, ?, ?, ?, ?)";
  const query2 =
    "INSERT INTO doctors (first_name, last_name, specialization, phone_number, email) VALUES (?, ? ,?, ?, ?)";
  const query3 =
    "INSERT INTO accounts (email, password, type) VALUES (?, ? ,?)";

  if (type == "P") {
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
          console.error("Error inserting patient:", error);
          return res.status(500).json({
            error: "Internal Server Error",
          });
        }

        db.query(query3, [email, hashedPassword, type], (error, data) => {
          if (error) {
            console.error("Error creating account:", error);
            return res.status(500).json({
              error: "Internal Server Error",
            });
          }
          res.status(201).send({
            message: "Patient and account created successfully.",
          });
        });
      }
    );
  } else {
    db.query(
      query2,
      [first_name, last_name, specialization, phone_number, email],
      (error, data) => {
        if (error) {
          console.error("Error inserting patient:", error);
          return res.status(500).json({
            error: "Internal Server Error",
          });
        }

        db.query(query3, [email, hashedPassword, type], (error, data) => {
          if (error) {
            console.error("Error creating account:", error);
            return res.status(500).json({
              error: "Internal Server Error",
            });
          }
          res.status(201).send({
            message: "Doctor and account created successfully.",
          });
        });
      }
    );
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;

  const query = "SELECT * FROM accounts WHERE email = ?";

  db.query(query, [email], (error, data) => {
    if (error) {
      console.error("Error querying account:", error);
      return res.status(500).json({
        error: "Internal Server Error",
      });
    }

    if (data.length === 0) {
      return res.status(404).json({
        error: "Account not found",
      });
    }

    const account = data[0];

    if (!bcryptjs.compareSync(password, account.password)) {
      return res.status(401).json({
        error: "Invalid password",
      });
    }

    res.status(200).send({
      message: "Sign in successful.",
    });
  });
};
