const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const express = require("express");
const passport = require("passport");
const pool = require("../../db");
const nodemailer = require("nodemailer");
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
                  throw err;
                }
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

/**
 * @route   POST api/auth/processReset
 * @description   Reset Password for a user
 **/
router.post("/processReset", async (req, res) => {
  let { pid, code, password } = req.body;

  //First check and make sure password is the 6 character requirement.
  if (password.length < 6) {
    res.status(400).json("Password must be 6 or more characters");
    return;
  }

  let response = await pool
    .query(`SELECT * FROM passwordreset WHERE pageid = $1`, [pid])
    .then((results) => {
      return results.rows[0];
    })
    .catch((error) => {
      res.status(400).json(error);
      return;
    });

  //Handle case if there for some reason is no record of the link.
  if (!response) {
    res.status(400).json("The password link has been expired or is incorrect.");
    return;
  }

  //Check if the codes match.
  if (code !== response.code) {
    res.status(400).json("Incorrect Reset Code");
    return;
  }
  //If they do, hash new password and update
  const salt = await bcrypt.genSalt(10);
  let hashedPassword = await bcrypt.hash(password, salt);
  let UpdateResponse = await pool
    .query(`UPDATE users SET password = $1 WHERE email = $2 `, [
      hashedPassword,
      response.email,
    ])
    .then((results) => {
      return true;
    })
    .catch((error) => {
      res.status(400).json(error);
      return false;
    });

  //If we successfully updated the DB record. Remove the reset request and purge expired records (30 min expire currently).
  if (UpdateResponse === true) {
    let TimeDiff = Math.floor(new Date().getTime() / 1000) - 3000000;
    let deleteResponse = await pool
      .query(`DELETE FROM passwordreset WHERE code = $1 OR time < $2  `, [
        code,
        TimeDiff,
      ])
      .then((results) => {
        return true;
      })
      .catch((error) => {
        res.status(400).json(error);
        return false;
      });
    if (deleteResponse) {
      res.status(201).json("Password Successfully Changed");
    }
  }
});

/**
 * @route   POST api/auth/resetReq
 * @description    Generate and email link for a password reset
 **/
router.post("/resetReq", async (req, res) => {
  let { email } = req.body;

  let response = await pool
    .query(`SELECT * FROM USERS WHERE email = $1`, [email])
    .then((results) => {
      return results.rows[0];
    })
    .catch((error) => {
      res.status(400).json(error);
      return;
    });

  if (!response) {
    res.status(404).json("Email is not registered");
    return;
  } else {
    //Get time stamp and create page id and reset code.
    let time = Math.floor(new Date().getTime() / 1000);
    let pid = crypto.randomBytes(15).toString("hex");
    let code = crypto.randomBytes(8).toString("hex");
    pool.query(
      `INSERT INTO passwordreset (email,pageid,code,time) VALUES ($1,$2,$3,$4)`,
      [email, pid, code, time]
    );

    //Mail out the reset code and password reset link
    const transporter = nodemailer.createTransport({
      port: 465,
      host: "smtp.gmail.com",
      auth: {
        user: "noreply.gifthandler@gmail.com",
        pass: `${process.env.EMAIL_PASSWORD}`,
      },
      secure: true,
    });
    const Mail = {
      from: "noreply.gifthandler@gmail.com",
      to: email,
      subject: "Reset Your Gift Handler Account Password",
      html: `<b>Please follow these instructions to reset your password.</b> <br/>
      <p>Please enter in the following code when resetting your password:<b>${code}</b></p>.<br/> 
      <p>To reset your password, visit the following link below:<p><br/>
      <a> http://54.193.8.100/passwordReset/${pid}</a>`,
    };

    transporter.sendMail(Mail, (err, info) => {
      if (err) {
        res.status(400).json("There was an issue sending a link to the email");
      } else {
        res
          .status(201)
          .json("A Password reset link & code has been sent to the email");
      }
    });
  }
});

module.exports = router;
