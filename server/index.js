const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3005;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Testing");
});

app.post("/users/register", async (req, res) => {
  let { name, email, password } = req.body;

  console.log({
    name,
    email,
    password,
  });

  /* TODO Error Handling and returning
  let errors = [];
  if (!name || !email || !password) {
    errors.push({ message: "Enter information for all Fields" });
  }
  if (password.length < 6) {
    errors.push({ message: "Passwords must be longer than 6 characters" });
  }
*/

  let hashedPassword = await bcrypt.hash(password, 10);
  console.log(hashedPassword);

  pool.query(
    `INSERT INTO users (name,email,password) VALUES ($1,$2,$3)
RETURNING id,password`,
    [name, email, hashedPassword],
    (err, results) => {
      if (err) {
        //TODO Also pass DB error back if necessary (unique email constraint)
        throw err;
      }
      console.log(results.rows);
    }
  );
});

app.get("/users/login", (req, res) => {
  res.render("login");
});

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
