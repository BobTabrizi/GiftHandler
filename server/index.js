require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const session = require("express-session");
const flash = require("express-flash");
const jwt = require("jsonwebtoken");
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

app.get("/auth/users", async (req, res) => {
  //TODO
});

app.post("/users/register", async (req, res) => {
  let { name, email, password } = req.body;

  console.log({
    name,
    email,
    password,
  });
  // let errors = [];
  /* TODO Error Handling and returning

  if (!name || !email || !password) {
    errors.push({ message: "Enter information for all Fields" });
  }
  if (password.length < 6) {
    errors.push({ message: "Passwords must be longer than 6 characters" });
  }
*/

  try {
    const salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(password, salt);

    pool.query(
      `SELECT * FROM users WHERE email = $1`,
      [email],
      (err, results) => {
        if (err) {
          throw err;
        }

        if (results.rows.length > 0) {
          // errors.push({ message: "Email already Registered" });
          res.status(400).json({ message: "Email already Registered" });
        } else {
          pool.query(
            `INSERT INTO users (name,email,password) VALUES ($1,$2,$3)
        RETURNING id, name, email`,
            [name, email, hashedPassword],
            (err, results) => {
              if (err) {
                //TODO Also pass DB error back if necessary (unique email constraint)
                throw err;
              }
              console.log(results.rows);

              const token = jwt.sign(
                { id: results.rows[0].id },
                process.env.SECRET,
                {
                  expiresIn: 3600,
                }
              );

              res.status(200).json({
                token,
                user: {
                  id: results.rows[0].id,
                  name: results.rows[0].name,
                  email: results.rows[0].email,
                },
              });
            }
          );
        }
      }
    );
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.post("/users/login", (req, res) => {
  passport.authenticate("local", { session: false }, (error, user) => {
    if (error || !user) {
      res.status(400).json({ error });
    }

    console.log(user);

    /** This is what ends up in our JWT */
    const payload = {
      email: user.email,
      expires: Date.now() + parseInt(50000),
    };
    /** assigns payload to req.user */
    req.login(payload, { session: false }, (error) => {
      if (error) {
        res.status(400).send({ error });
      }

      /** generate a signed json web token and return it in the response */
      const token = jwt.sign(JSON.stringify(payload), process.env.SECRET);

      console.log(token);
      /** assign our jwt to the cookie */

      res.cookie("jwt", token, { httpOnly: true, secure: true });

      payload.token = token;
      //For now, sending token, but ultimately want to set cookie on browser.
      //Doesn't seem to be possible to set cookie with my current configuration, so this will do for now.
      res.status(200).send(payload);
    });
  })(req, res);
});

/*
app.post("/users/login", passport.authenticate("local"), function (req, res) {
  // If this function gets called, authentication was successful.
  // `req.user` contains the authenticated user.
  res.json("EEE");
});
*/
app.get("/users/dashboard", (req, res) => {
  res.render("dashboard", { user: "LEEROY JENKINS" });
});

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
