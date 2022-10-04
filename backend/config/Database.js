const mongoose = require("mongoose");

const DatabaseConnect = () => {
  mongoose
    .connect(process.env.MONGO)
    .then(() => {
      console.log("Database Connected");
    })
    .catch((err) => console.log(err.message));
};

module.exports = DatabaseConnect;
