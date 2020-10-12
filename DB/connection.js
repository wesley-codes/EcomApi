const mongoose = require("mongoose");

const URI =
  "mongodb+srv://emeka:test1234@ecommerce.6wtli.mongodb.net/<dbname>?retryWrites=true&w=majority";
const connectDB = async () => {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("db connected");
  } catch (err) {
    console.log(err);
  }
};

//=======EXPORTING THE CONNECTION VARIABLE===========

module.exports = connectDB;
