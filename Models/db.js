const mongoose = require("mongoose");

main().catch((err) => console.log(err));

async function main() {
  const url = "mongodb://localhost:27017/Crud-oprations";

  await mongoose.connect(url);
  try {
    console.log("data conected succuflly");
  } catch (error) {
    console.log("error->", error);
  }
}
