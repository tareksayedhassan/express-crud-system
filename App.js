const api = require("./Routes/API");
const express = require("express");
const app = express();
const DBConected = require("./Models/db");

app.use(express.json());
app.use("/api/crud", api);

const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
