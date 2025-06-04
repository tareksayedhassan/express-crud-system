const JWT = require("jsonwebtoken");

module.exports = async (payload) => {
  const token = await JWT.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: "60m",
  });
  return token;
};
