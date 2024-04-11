import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mysql from "mysql2";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
import cookieParser from "cookie-parser";

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

export default db;

app.use(express.json());
app.use(cookieParser());

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
