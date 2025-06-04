const mongoose = require("mongoose");

const CrudSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      // <-- lowercase
      type: String,
      required: true,
    },
    categories: {
      // <-- spelling corrected
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
