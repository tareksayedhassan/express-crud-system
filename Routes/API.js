const express = require("express");
const app = express();
app.use(express.json());

const router = express.Router();

const {
  getAllData,
  getSingleData,
  addPost,
  updateData,
  deleteData,
} = require("../Controllers/CrudController");

router.get("/", getAllData);
router.get("/:id", getSingleData);
router.post("/", addPost);
router.patch("/:id", updateData);
router.delete("/:id", deleteData);
module.exports = router;
