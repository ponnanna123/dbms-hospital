import db from "../server.js";

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

export const deleteUser = (req, res) => {};

export const updateUser = (req, res) => {};
