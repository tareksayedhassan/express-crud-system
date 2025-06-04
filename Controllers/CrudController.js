const { validationResult } = require("express-validator");

const CrudSchema = require("../Models/Crud.model");
const { SUCCESS, FAIL, ERROR } = require("../utils/httpStatusText");
const asyncWrapper = require("../middleware/asyncWrapper");
const AppError = require("../utils/AppError");

const getAllData = asyncWrapper(async (req, res) => {
  // pagination
  const query = req.query;
  const limit = query.limit || 10;
  const page = query.page || 1;
  const skip = (page - 1) * limit;
  const Crud = await CrudSchema.find({}, { __v: false })
    .limit(limit)
    .skip(skip);
  res.json({ status: SUCCESS, data: { Crud } });
});

const getSingleData = asyncWrapper(async (req, res, next) => {
  const crudItem = await CrudSchema.findById(req.params.id);

  if (!crudItem) {
    const error = AppError.create("crud not found", 404, FAIL);
    return next(error);
  }
  res.status(200).json({ status: SUCCESS, data: { item: crudItem } });
});
const addPost = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(AppError.create(errors.array(), 400, "Fail"));
  }
  const newCrud = new CrudSchema(req.body);
  await newCrud.save();
  res.status(201).json({
    status: "success",
    data: newCrud,
  });
});
const updateData = asyncWrapper(async (req, res) => {
  const updatedCrud = await CrudSchema.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  if (!updatedCrud) {
    return res.status(404).json({ status: ERROR, message: FAIL });
  }
  res.json({ status: SUCCESS, data: updatedCrud });
});

const deleteData = asyncWrapper(async (req, res) => {
  const data = await CrudSchema.deleteOne({ _id: req.params.id });
  res.status(200).json({ status: "Crud deleted successfully", success: true });
});
module.exports = {
  getAllData,
  getSingleData,
  addPost,
  updateData,
  deleteData,
};
