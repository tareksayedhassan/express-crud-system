const UsersSchema = require("../Models/User.model.js");
const AppError = require("../utils/AppError.js");
const asyncWrapper = require("../middleware/asyncWrapper.js");
const { FAIL, SUCCESS, ERROR } = require("../utils/httpStatusText");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const generateJWT = require("../utils/generateJWT.js");

const register = asyncWrapper(async (req, res, next) => {
  const { firstName, lastName, email, password, role } = req.body;
  const oldUser = await UsersSchema.findOne({ email });
  if (oldUser) {
    const error = AppError.create("User already exists", 400, FAIL);
    return next(error);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new UsersSchema({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    role,
    avatar: req.file.filename,
  });

  // generate JWT token
  const token = await generateJWT({
    email: newUser.email,
    id: newUser._id,
    role: newUser.role,
  });

  newUser.token = token;
  await newUser.save();

  res.status(201).json({
    status: SUCCESS,
    message: "User registered successfully",
    code: 201,
    data: newUser,
  });
});

const login = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email && password) {
    const error = AppError.create("email and password are required", 400, FAIL);
    return next(error);
  }

  const user = await UsersSchema.findOne({ email: email });
  if (!user) {
    const error = AppError.create("User not  exists", 404, ERROR);
    return next(error);
  }
  const matchedPassword = await bcrypt.compare(password, user.password);
  if (user && matchedPassword) {
    // logged in successfully

    const token = await generateJWT({
      email: user.email,
      id: user._id,
      role: user.role,
    });

    return res.status(200).json({
      status: SUCCESS,
      message: "User Logged successfully",
      data: { token },
    });
  } else {
    const error = AppError.create("something wrond", 500, ERROR);
    return next(error);
  }
});

module.exports = { register, login };
