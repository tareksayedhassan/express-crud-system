const mongoose = require("mongoose");

const CrudSchema = new mongoose.Schema(
  {
    Title: {
      type: String,
      required: true,
    },
    Description: {
      type: String,
      required: true,
    },
    Categpryes: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "Crud",
  }
);

module.exports = mongoose.model("crud", CrudSchema);
