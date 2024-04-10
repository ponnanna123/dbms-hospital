import db from "../server.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const patientsignup = async (req, res) => {
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

  const query1 =
    "INSERT INTO patients (first_name, last_name, date_of_birth, gender, address, phone_number, email) VALUES (?, ? ,?, ?, ?, ?, ?)";
  const query2 =
    "INSERT INTO accounts (email, password, type) VALUES (?, ? ,?)";

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

      db.query(query2, [email, hashedPassword, type], (error, data) => {
        if (error) {
          console.error("Error creating account:", error);
          return res.status(500).json({
            error: "Internal Server Error",
          });
        }
        res.status(201).send({
          message: "Patient account created successfully.",
        });
      });
    }
  );
};

export const doctorsignup = async (req, res) => {
  const {
    email,
    password,
    first_name,
    last_name,
    phone_number,
    specialization_id,
    department_id,
    gender,
    type,
  } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);

  const query1 =
    "INSERT INTO doctors (first_name, last_name, specialization_id, department_id, gender, phone_number, email) VALUES (?, ?, ?, ?, ?, ?, ?)";
  const query2 =
    "INSERT INTO accounts (email, password, type) VALUES (?, ? ,?)";

  db.query(
    query1,
    [
      first_name,
      last_name,
      specialization_id,
      department_id,
      gender,
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

      db.query(query2, [email, hashedPassword, type], (error, data) => {
        if (error) {
          console.error("Error creating account:", error);
          return res.status(500).json({
            error: "Internal Server Error",
          });
        }
        res.status(201).send({
          message: "Doctor account created successfully.",
        });
      });
    }
  );
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
    const { email, type } = req.body;
    const query = "SELECT * FROM accounts WHERE email = ?";

    db.query(query, [email], (error, data) => {
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
        const query1 =
          "INSERT INTO accounts (email, password, type) VALUES (?, ?, ?)";
        db.query(query1, [email, hashedPassword, type], (error, result) => {
          if (error) {
            console.log(error);
          } else {
            const query2 = "SELECT LAST_INSERT_ID() as account_id";
            db.query(query2, (error, result) => {
              if (error) {
                console.log(error);
              } else {
                const account_id = result[0].account_id;
                const token = jwt.sign({ id: account_id }, process.env.JWT_KEY);
                const { password: pass, ...rest } = account;
                res
                  .cookie("access_token", token, {
                    httpOnly: true,
                    expires: new Date(Date.now() + 24 * 60 * 60 * 365),
                  })
                  .status(200)
                  .send(rest);
              }
            });
          }
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
};
