const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const express = require("express");
const passport = require("passport");
const pool = require("../../db");
const initializePassport = require("../../passport");

initializePassport(passport);

const router = express.Router();

router.use(passport.initialize());

/**
 * @route   POST api/auth/login
 * @description    Login an existing user
 **/
router.post("/login", async (req, res) => {
  passport.authenticate("local", { session: false }, (error, user) => {
    if (error) {
      res.status(400).json({ error });
    } else if (!user) {
      res
        .status(400)
        .json({ error: { message: "Invalid username or password" } });
    } else {
      //JWT Payload
      const payload = {
        user,
        expires: Date.now() + parseInt(50000),
      };

      req.login(payload, { session: false }, (error) => {
        if (error) {
          res.status(400).send({ error });
        } else {
          // generate a signed json web token and return it in the response
          const token = jwt.sign(JSON.stringify(payload), process.env.SECRET);
          // assign jwt to the cookie
          res.cookie("jwt", token, { httpOnly: true, secure: true });
          payload.token = token;
          //For now, sending token, but ultimately want to set cookie on browser.
          //TODO revisit this, Doesn't seem to be possible to set cookie with my current configuration, so this will do for now.
          res.status(200).send(payload);
        }
      });
    }
  })(req, res);
});

/**
 * @route   POST api/auth/register
 * @description    Register and login a new user
 **/
router.post("/register", async (req, res) => {
  let { name, email, password } = req.body;
  let profileImage = "DefaultProfileImage";
  console.log({
    name,
    email,
    password,
  });

  if (!name || !email || !password) {
    res.status(400).json("Enter Information for all fields");
  } else if (password.length < 6) {
    res.status(400).json("Passwords must be longer than 6 characters");
  } else {
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
            res.status(400).json("Email already registered");
          } else {
            pool.query(
              `INSERT INTO users (name,email,password,profileimage) VALUES ($1,$2,$3,$4)
          RETURNING id, name, email, profileimage`,
              [name, email, hashedPassword, profileImage],
              (err, results) => {
                if (err) {
                  //TD Also pass DB error back if necessary (unique email constraint)
                  throw err;
                }
                // console.log(results.rows);
                let user = {
                  id: results.rows[0].id,
                  name: results.rows[0].name,
                  email: results.rows[0].email,
                  image: results.rows[0].profileimage,
                };

                const payload = {
                  user,
                  expires: Date.now() + parseInt(50000),
                };

                const token = jwt.sign(
                  JSON.stringify(payload),
                  process.env.SECRET
                );

                res.status(200).json({
                  token,
                  user: {
                    id: results.rows[0].id,
                    name: results.rows[0].name,
                    email: results.rows[0].email,
                    image: results.rows[0].profileimage,
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
  }
});

/**
 * @route   GET api/auth/user
 * @description    Get a user's data
 **/
router.get("/user", async (req, res) => {
  let token = req.query.token;
  if (token) {
    let decoded = jwt.verify(token, process.env.SECRET);
    let UID = decoded.user.id;
    pool.query(`SELECT * FROM users WHERE id = $1`, [UID], (err, results) => {
      if (err) {
        throw err;
      }
      if (!results.rows[0]) {
        res.status(404).json({ message: "User ID Not Found" });
      } else {
        res.json(results.rows[0]);
      }
    });
  }
});

/**
 * @route   POST api/auth/update
 * @description    Update a User's Profile
 **/
router.post("/update", async (req, res) => {
  let { UID, name, profileImage } = req.body;
  pool.query(
    `UPDATE users SET name = '${name}', profileimage = '${profileImage}' WHERE id = $1
    RETURNING *`,
    [UID],
    (err, results) => {
      if (err) {
        throw err;
      }
      if (!results.rows[0]) {
        res.status(404).json({ message: "User ID Not Found" });
      } else {
        res.json(results.rows[0]);
      }
    }
  );
});

module.exports = router;
