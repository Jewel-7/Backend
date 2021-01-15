const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const routes = require("./routes/route");
const PORT = process.env.PORT || 3000;
dotenv.config({
  path: "./config.env",
});
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/user", routes);

mongoose.connect(
  process.env.DATABASE_URL,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (err, connection) => {
    if (err) {
      console.log(err);
      return console.log("Error in connecting to Database");
    }

    app.listen(process.env.PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });

    console.log("succesfully connected");
  }
);
