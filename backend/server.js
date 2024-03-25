import express from "express";
import dotenv from "dotenv";
import mysql from "mysql2";
import cors from "cors";

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

app.use(express.json());
app.use(cors());

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});

app.get("/", (req, res) => {
  try {
    res.json("Homepage");
  } catch (error) {
    console.log(error);
  }
});

app.get("/patients", (req, res) => {
  const query = "SELECT * FROM patients";

  db.query(query, (error, data) => {
    try {
      res.json(data);
    } catch (error) {
      console.log(error);
    }
  });
});

app.post("/add-patient", (req, res) => {
  const {
    first_name,
    last_name,
    date_of_birth,
    gender,
    address,
    phone_number,
  } = req.body;

  const query =
    "INSERT INTO patients (first_name, last_name, date_of_birth, gender, address, phone_number) VALUES (?, ? ,?, ?, ?, ?)";

  db.query(
    query,
    [first_name, last_name, date_of_birth, gender, address, phone_number],
    (error, data) => {
      if (error) {
        console.error("Error inserting patient:", error);
        return res.status(500).json({
          error: "Internal Server Error",
        });
      }
      res.status(201).send({
        message: "Patient inserted successfully.",
      });
    }
  );
});
