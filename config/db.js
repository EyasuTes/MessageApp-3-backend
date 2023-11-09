const mongoose = require("mongoose");

const mongodbConnect = () => {
  const conn = mongoose
    .connect(process.env.mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("mongoose connected"))
    .catch((error) => console.log(error.message));
};
module.exports = mongodbConnect;
