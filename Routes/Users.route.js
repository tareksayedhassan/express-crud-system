const express = require("express");
const { getAllUsers } = require("../Controllers/usersController");
const { login, register } = require("../Controllers/authController");
const verifyToken = require("../middleware/verfiyToken");
const allowedTo = require("../middleware/allowedTo");
const app = express();
const multer = require("multer");
const AppError = require("../utils/AppError");
const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    const fileName = `user-${Date.now()}.${ext}`;
    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  const imageType = file.mimetype.split("/")[0];
  if (imageType === "image") {
    return cb(null, true);
  } else {
    return cb(AppError.create("file must be an image", 400), false);
  }
};

const upload = multer({ storage: diskStorage, fileFilter: fileFilter });
app.use(express.json());
const router = express.Router();

router.get("/", verifyToken, allowedTo("admin", "manger"), getAllUsers);
router.post("/register", upload.single("avatar"), register);
router.post("/login", login);
module.exports = router;
