require("dotenv").config();
var cors = require("cors");
const CrudRoute = require("./Routes/Crud.route");
const Users = require("./Routes/Users.route");
const express = require("express");
const app = express();
const DBConected = require("./Models/db");
const path = require("path");
const { SUCCESS, FAIL, ERROR } = require("./utils/httpStatusText");

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cors());
app.use(express.json());
app.use("/api/user", Users);
app.use("/api/crud", CrudRoute);

// Globale Error handler
app.use((error, req, res, next) => {
  res.status(error.statusCode || 500).json({
    status: error.statusText || ERROR,
    message: error.message,
    code: error.statusCode || 500,
    data: null,
  });
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
