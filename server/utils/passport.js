/**
 *
 * @File passport.js
 * @Description Authentication middleware, using JSON Web Tokens
 *
 */

require("dotenv").config();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const pool = require("./db");
const bcrypt = require("bcrypt");
const secret = process.env.SECRET;

function initialize(passport) {
  const authenticateUser = async (email, password, done) => {
    pool.query(
      `SELECT * FROM users WHERE email = $1`,
      [email],
      (err, results) => {
        if (err) {
          throw err;
        }
        if (results.rows.length > 0) {
          const user = results.rows[0];

          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
              console.log(err);
            }
            if (isMatch) {
              return done(null, user);
            } else {
              return done({ message: "Password is incorrect" }, false);
            }
          });
        } else {
          return done({ message: "Email address not registered" }, false);
        }
      }
    );
  };

  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      authenticateUser
    )
  );

  passport.use(
    new JWTStrategy(
      {
        jwtFromRequest: (req) => req.cookies.jwt,
        secretOrKey: secret,
      },
      (jwtPayload, done) => {
        if (Date.now() > jwtPayload.expires) {
          return done("jwt expired");
        }

        return done(null, jwtPayload);
      }
    )
  );
}

module.exports = initialize;
