const { SUCCESS } = require("../utils/httpStatusText.js");
const UsersSchema = require("../Models/User.model.js");

const getAllUsers = async (req, res) => {
  // pagination

  const query = req.query;
  const limit = query.limit || 10;
  const page = query.page || 1;
  const skip = (page - 1) * limit;
  const Users = await UsersSchema.find({}, { __v: false, password: false })
    .limit(limit)
    .skip(skip);
  res.json({ status: SUCCESS, data: { Users } });
};
module.exports = { getAllUsers };
