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