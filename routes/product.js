const assert = require("assert");
const express = require("express");
const router = require("express").Router();

const path = require("path");
const mongoose = require("mongoose");

const multer = require("multer");

//==========REQUIRING/IMPORTING PRODUCTDES VARIABLE FROM THE ROUTE ../DB/DESCRPTIONMODEL==========
const ProductDes = require("../DB/descriptionModel");
const { json } = require("body-parser");
const { response } = require("express");
const route = express.Router();
const dotenv = require("dotenv");

const storage = multer.diskStorage({
  destination: "./routes/uploads",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Init upload variable
const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).array("image");

//check file type
function checkFileType(file, cb) {
  //allowed ext
  const filetypes = /jpeg|jpg|png/;
  //check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase);
  //cheeck mimetype
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: images only");
  }
}

//=======CREATING A POST REQUEST FUNCTION========
router.route("/add", upload).post((req, res) => {
  let desModel = new ProductDes({
    productName: req.body.productName,
    description: req.body.description,
    image: req.file.path
  });
  console.log(req.body);

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
router.route("/").get((req, res) => {
  ProductDes.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

//==========TO FETCH A PARTICULAR DATA==========
router.route("/:id").get((req, res) => {
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
router.route("/update/:id").put((req, res) => {
  const id = req.params.id;
  ProductDes.findByIdAndUpdate({ _id: req.params.id }, { ...req.body }).then(
    () => {
      res.status(200).json({ message: "update successful" });
    }
  );
});

//
// ==========DELETE DATA FROM DATABASE============
router.route("/delete/:id").delete((req, res) => {
  const id = req.params.id;
  ProductDes.findByIdAndDelete({ _id: req.params.id }).then((result) => {
    res.json({ message: "product deleted from database" });
  });
});

module.exports = router;
