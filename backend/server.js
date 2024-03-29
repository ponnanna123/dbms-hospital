import express from "express";
import dotenv from "dotenv";
import mysql from "mysql2";
import cors from "cors";
import bcryptjs from "bcryptjs";
// import authRouter from "./routes/authRouter.js";
// import userRouter from "./routes/userRouter.js";

dotenv.config();

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.DB_PASS,
  database: process.env.DB_SCHEMA,
});

db.connect(() => {
  try {
    console.log("Connected to MySQL database");
  } catch (error) {
    console.log(error);
  }
});

// export default db;

app.use(express.json());
app.use(cors());

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});

app.get("/api/user/patients", (req, res) => {
  const query = "SELECT * FROM patients";

  db.query(query, (error, data) => {
    try {
      res.json(data);
    } catch (error) {
      console.log(error);
    }
  });
});

app.post("/api/auth/sign-up", async (req, res) => {
  const {
    email,
    password,
    first_name,
    last_name,
    date_of_birth,
    gender,
    address,
    phone_number,
  } = req.body;

  const type = "P";
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
          message: "Patient and account created successfully.",
        });
      });
    }
  );
});
