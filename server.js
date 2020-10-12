const express = require("express");
const cors = require("cors");
//==========REQUIRING/IMPORTING CONNECTDB VARIABLE FROM THE ROUTE ../DB/CONNECTION==========
const connectDB = require("./DB/connection");
const app = express();
app.use(cors());
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
let PORT = process.env.PORT || 3000;
app.use(bodyParser.json());

connectDB();

const productsRoutes = require("./routes/product");

app.use("/product", productsRoutes);

app.listen(PORT, () => {
  console.log("server is running");
});
