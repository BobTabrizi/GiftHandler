const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const session = require("express-session");
const flash = require("express-flash");

const passport = require("passport");
const initializePassport = require("./passport");

initializePassport(passport);

app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3005;

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
    `SELECT * FROM users WHERE email = $1`,
    [email],
    (err, results) => {
      if (err) {
        throw err;
      }

      console.log(results.rows);

      if (results.rows.length > 0) {
        errors.push({ message: "Email already Registered" });
      } else {
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
      }
    }
  );
});

app.post("/users/login", passport.authenticate("local"), function (req, res) {
  // If this function gets called, authentication was successful.
  // `req.user` contains the authenticated user.
  res.json("EEE");
});

app.get("/users/dashboard", (req, res) => {
  res.render("dashboard", { user: "LEEROY JENKINS" });
});

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
