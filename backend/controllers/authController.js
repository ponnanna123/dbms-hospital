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
};
