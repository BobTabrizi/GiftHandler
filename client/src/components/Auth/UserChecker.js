/**
 * @Component UserChecker
 * @Description Recieves a JWT and decodes it for user validation
 *
 */

export const UserChecker = (JWT) => {
  if (JWT) {
    let token = {};
    token.raw = JWT;
    token.header = JSON.parse(window.atob(JWT.split(".")[0]));
    token.payload = JSON.parse(window.atob(JWT.split(".")[1]));
    return token.payload.user;
  } else {
    return null;
  }
};
