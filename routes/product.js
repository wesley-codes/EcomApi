
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const multer = require("multer")

const fs = require("fs")
var fileupload =require("express-fileupload")
//==========REQUIRING/IMPORTING PRODUCTDES VARIABLE FROM THE ROUTE ../DB/DESCRPTIONMODEL==========
const ProductDes = require("../DB/descriptionModel");
const { json } = require("body-parser");
const { response } = require("express");
const router = express.Router();
 require("dotenv").config()
const { log } = require("console");


var cloudinary = require("cloudinary").v2
  cloudinary.config({
  cloud_name : "+++++++",
  api_key : "+++++" ,
  api_secret : "+++++"
})






var upload = multer({dest: "uploads/" })


router.post("/add", upload.single('image'), (req, res) => {
  
  console.log("result >>>",req.file)
   cloudinary.uploader.upload(req.file.path, function(error,result){
     console.log(result)
  
const desModel =  ProductDes({
  productName: req.body.productName,
      description: req.body.description,
      image:req.file.path
})

  desModel
    .save()
    .then(() => {
      res.json({ message: "Data successfully pushed to the database" });
      console.log("added to db");
    })
    .catch((err) => {
      console.log(err);
    });
});
})











//=====FETCH ALL DATA===========
router.get("/",(req, res) => {
  ProductDes.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

//==========TO FETCH A PARTICULAR DATA==========
router.get("/:id",(req, res) => {
  const id = req.params.id;
  console.log(id);
  ProductDes.findOne({ _id: req.params.id })
    .then((ProductDes) => {
      res.status(200).json(ProductDes);
    })
    .catch((err) => {
      console.log(err);
    });
});
//========== UPDATE A PARTICULAR FIELD ==========
router.put("/update/:id",(req, res) => {
  const id = req.params.id;
  ProductDes.findByIdAndUpdate({ _id: req.params.id }, { ...req.body }).then(
    () => {
      res.status(200).json({ message: "update successful" });
    }
  );
});

//
// ==========DELETE DATA FROM DATABASE============
router.delete("/delete/:id",(req, res) => {
  const id = req.params.id;
  ProductDes.findByIdAndDelete({ _id: req.params.id }).then((result) => {
    res.json({ message: "product deleted from database" });
  });
});

module.exports = router;
