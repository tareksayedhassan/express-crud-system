const { validationResult } = require("express-validator");

const CrudSchema = require("../Models/Crud.model");

const getAllData = async (req, res) => {
  const Crud = await CrudSchema.find();
  res.json({ status: "success", data: { Crud } });
};

const getSingleData = async (req, res) => {
  const Crud = await CrudSchema.findById(req.params.id);
  res.json({ status: "success", data: { Crud } });
};

const addPost = async (req, res) => {
  try {
    const newCrud = new CrudSchema(req.body);
    await newCrud.save();
    res.status(201).json(newCrud);
  } catch (error) {
    console.log(error);
  }
};
const updateData = async (req, res) => {
  try {
    const updatedCrud = await CrudSchema.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedCrud) {
      return res
        .status(404)
        .json({ status: "error", message: "Data not found" });
    }
    res.json({ status: "success", data: updatedCrud });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

const deleteData = async (req, res) => {
  try {
    const data = await CrudSchema.deleteOne({ _id: req.params.id });
    if (data.deletedCount === 0) {
      return res.status(404).json({ error: "Crud not found" });
    }
    res.status(200).json({ msg: "Course deleted successfully", success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
module.exports = {
  getAllData,
  getSingleData,
  addPost,
  updateData,
  deleteData,
};
