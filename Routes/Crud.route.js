const express = require("express");
const app = express();
app.use(express.json());
const { body } = require("express-validator");
const verifyToken = require("../middleware/verfiyToken");
const allowedTo = require("../middleware/allowedTo");
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
router.post(
  "/",
  verifyToken,
  [
    body("title").notEmpty().withMessage("title is required"),
    body("description").notEmpty().withMessage("Description is  required"),
    body("categories").notEmpty().withMessage("Categpryes is required"),
  ],
  addPost
);
router.patch("/:id", updateData);
router.delete("/:id", verifyToken, allowedTo("admin", "manger"), deleteData);
module.exports = router;
