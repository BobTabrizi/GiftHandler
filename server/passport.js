const LocalStrategy = require("passport-local").Strategy;
const pool = require("./db");
const bcrypt = require("bcrypt");

function initialize(passport) {
  const authenticateUser = (email, password, done) => {
    pool.query(
      `SELECT * FROM users WHERE email = $1`,
      [email],
      (err, results) => {
        if (err) {
          throw err;
        }
        // console.log(results.rows);

        if (results.rows.length > 0) {
          const user = results.rows[0];

          if (user.password === password) {
            return done(null, user);
          } else {
            return done(null, false, { message: "Password Incorrect" });
          }
        } else {
          return done(null, false, { message: "This Email is not Registered" });
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

  //Store user ID in session cookie
  passport.serializeUser((user, done) => done(null, user.id));

  //Use ID to obtain details from DB and store object into session.
  passport.deserializeUser((id, done) => {
    pool.query(`SELECT * FROM users WHERE id = $1`, [id], (err, results) => {
      if (err) {
        throw err;
      }
      return done(null, results.rows[0]);
    });
  });
}

module.exports = initialize;
