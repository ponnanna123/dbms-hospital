import db from "../server.js";
import { errorHandler } from "../utils/error.js";

export const createAppointment = async (req, res, next) => {
  try {
    const {} = req.body;

    const query1 = "INSERT INTO appointments (";
  } catch (error) {
    next(error);
  }
};
