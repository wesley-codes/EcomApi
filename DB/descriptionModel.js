const mongoose = require("mongoose");

//==========USING MONGOOSE SCHEMA TO INPUT PRODUCTNAME AND DESCRIPTION=========
const productDes = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

//==========EXPORTING "PRODUCTDES VARIABLE WHICH IS THE THE MODEL"
module.exports = ProductDes = mongoose.model("description", productDes);
