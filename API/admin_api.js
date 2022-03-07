const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");
var uniqid = require("uniqid");

const {
  GallerySchema,
  TestimonialSchema,
  ClientReview,
} = require("../db/connect.db");
const { reviewFormTomail } = require("./mailer_api");
// upload gallery
let galleryStore = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = `./uploads/gallery/${req.params._dir}_images`;
    fs.access(dir, function (error) {
      if (error) {
        fs.mkdir(
          `./uploads/gallery/${req.params._dir}_images`,
          { recursive: true },
          function (err) {
            if (err) console.log(err);
            else {
              console.log("New directory successfully created.");
              cb(null, dir);
            }
          }
        );
      } else {
        cb(null, dir);
      }
    });
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "." + uniqid() + ".jpg");
  },
});

var uploadGallery = multer({ storage: galleryStore });
router.post(
  "/api/admin/v1/gallery/:_dir",
  uploadGallery.array("files"),
  async (req, res) => {
    if (!req.body) {
      return res.status(422).send("fields are empty!");
    }
    const files = req?.files;
    let new_images = [];
    files.map((f) => {
      new_images.push({
        img_url: "/" + f.path,
      });
    });
    console.log(new_images);
    const createGallery = new GallerySchema({
      service_code: req.params._dir,
      images: new_images,
    });
    createGallery
      .save()
      .then((result) => {
        console.log(result);
        res.status(200).send(result);
      })
      .catch((error) => {
        res.status(500).send({ error: "unable to update" });
        console.log(error);
      });
  }
);

/// upload testimonials
var reviewStore = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = `./uploads/adminReviews/${req.params._dir}_reviews`;
    fs.access(dir, function (error) {
      if (error) {
        fs.mkdir(
          `./uploads/adminReviews/${req.params._dir}_reviews`,
          { recursive: true },
          function (err) {
            if (err) console.log(err);
            else {
              console.log("New directory successfully created.");
              cb(null, dir);
            }
          }
        );
      } else {
        cb(null, dir);
      }
    });
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "." + uniqid() + ".jpg");
  },
});

var uploadReview = multer({ storage: reviewStore });

router.post(
  "/api/admin/v1/reviews/:_dir",
  uploadReview.single("file"),
  (req, res) => {
    console.log(req.body);
    console.log(req.file);
    if (!req.params._dir && !req.body) {
      return res.status(422).send("fields are empty!");
    }
    const newAdminReview = new TestimonialSchema({
      service_code: req.params._dir,
      image: "/" + req.file.path,
      feedback: req.body.feedback,
      date: new Date(),
      name: req.body.name,
      stars: req.body.stars,
    });
    newAdminReview
      .save()
      .then((result) => {
        return res.status(200).send(result);
      })
      .catch((err) => {
        return res.send(err);
      });
  }
);

////get review list:

router.get("/api/admin/v1/reviews", (req, res) => {
  ClientReview.find()
    .then((result) => {
      return res.status(200).send(result);
    })
    .catch((err) => {
      return res.send(err);
    });
});

////get gallry data

router.get("/api/admin/v1/galleryall", (req, res) => {
  GallerySchema.find()
    .then((result) => {
      return res.status(200).send(result);
    })
    .catch((err) => {
      return res.send(err);
    });
});

module.exports = router;
