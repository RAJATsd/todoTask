const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 3000;
const MONGO_PORT = process.env.MONGO_PORT || "mongodb://localhost:27017/sol_tasks";

const userRoutes = require("./routes/user");

const app = express();

app.use(bodyParser.json());

app.use("/user", userRoutes);

mongoose.connect(MONGO_PORT, () => {
  app.listen(PORT, () => console.log(`serving on port ${PORT}`));
});
