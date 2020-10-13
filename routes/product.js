const assert = require("assert");
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const multer = require("multer");

//==========REQUIRING/IMPORTING PRODUCTDES VARIABLE FROM THE ROUTE ../DB/DESCRPTIONMODEL==========
const ProductDes = require("../DB/descriptionModel");
const { json } = require("body-parser");
const { response } = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const { log } = require("console");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,'./routes/uploads')
  },
  filename: function(req, file, cb)  {
    cb(
      null,
      new Date().toISOString()+ file.originalname
    );
  },
});

const upload = multer({storage: storage })

// Init upload variable


//check file type


//=======CREATING A POST REQUEST FUNCTION========
router.post("/add", upload.single('image'), (req, res) => {
  let desModel = new ProductDes({
    productName: req.body.productName,
    description: req.body.description,
    image:req.file.path
  });
  console.log('file>>>',req.file);
  console.log(desModel);
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

// router.route("/upload/Image").post((req, res) => {
//   cloudinary.uploader
//     .upload(path.join(process.cwd(), "routes", "21.png"))
//     .then((result) => {
//       console.log(result);
//       res.json({ message: "Data successfully pushed to the database" });
//     })
//     .catch((err) => {
//       return res.json(err);
//     });
// });

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
