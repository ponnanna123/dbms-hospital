import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mysql from "mysql2";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";

dotenv.config();

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.DB_PASS,
  database: process.env.DB_SCHEMA,
  // Not recommended; vulnerable to SQL injection attacks
  /* multipleStatements: true, */
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

// Will be used in production

// var corsOptions = {
//   origin: "http://localhost:5173",
//   credentials: true,
//   optionsSuccessStatus: 200,
// };

// app.use(cors(corsOptions));
app.use(
  cors({
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
