const JWT = require("jsonwebtoken");

const generateToken = (id) => {
  return JWT.sign({ id }, process.env.jwtKey, {
    // expiresIn: "1d",
  });
};
module.exports = generateToken;
