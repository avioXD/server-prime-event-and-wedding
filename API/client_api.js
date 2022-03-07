const express = require("express");
const router = express.Router();
const multer = require("multer");
var CryptoJS = require("crypto-js");
const { clientRequestResponse, sendToAdmin } = require("./mailer_api");
const encrypt = (content) => {
  if (content)
    return CryptoJS.AES.encrypt(
      JSON.stringify(content),
      process.env.SALT_KEY
    ).toString();
  else return "";
};
const decrypt = (content) => {
  if (content) {
    var bytes = CryptoJS.AES.decrypt(content, process.env.SALT_KEY);
    return (decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8)));
  } else {
    return "";
  }
};

const {
  ClientRequests,
  ClientReview,
  GallerySchema,
  TestimonialSchema,
} = require("../db/connect.db");

// post requests
router.post("/api/client/v1/request", async (req, res) => {
  body = req.body;
  if (!body.name || !body.phone) {
    return res.status(422).send("Fields are empty!");
  }

  const createRequest = new ClientRequests({
    name: body.name,
    email: body.email,
    phone: body.phone,
    event_type: body.event_type,
    describe: body.describe,
    time: new Date(),
  });

  createRequest
    .save()
    .then((result) => {
      console.log(result);
      clientRequestResponse(result.name, result.email);
      sendToAdmin(result);
      return res.status(200).send(result);
    })
    .catch((err) => {
      return res.status(500).send("Server Error");
    });
});

///// review submit

let filePath = "./uploads";

let reviewStore = multer.diskStorage({
  destination: function (req, file, cb) {
    const filepath = filePath + "/reviews";
    cb(null, filepath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "." + encrypt(file.originalname) + ".jpg");
  },
});
var uploadSingle = multer({ storage: reviewStore });
router.post(
  "/api/client/v1/reviews",
  uploadSingle.single("file"),
  async (req, res) => {
    console.log(req.body);
    body = req.body;
    if (!body) {
      return res.status(422).send("fields are empty!");
    }
    const createReview = new ClientReview({
      name: req.body?.name,
      feedback: req.body?.feedback,
      img_url: "/" + req?.file?.path,
      stars: req.body.stars,
      time: req.body.time,
    });
    createReview
      .save()
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        return res.send(err);
      });
  }
);

//// get gallery schema
router.get("/api/client/v1/gallery/:_dir", (req, res) => {
  console.log(req.params._dir);
  if (!req.params._dir) {
    return res.status(422).send("Invalid Params!");
  }
  if (req.params._dir == "ALL") {
    GallerySchema.find()
      .then((result) => {
        let Images = [];
        result.map((d) => {
          d.images.map((x) => {
            Images.push(x);
          });
        });
        return res.status(200).send(Images);
      })
      .catch((error) => {
        res.status(500).send({ error: error });
        console.log(error);
      });
  } else {
    GallerySchema.find({ service_code: req.params._dir })
      .then((result) => {
        let Images = [];
        result.map((d) => {
          d.images.map((x) => {
            Images.push(x);
          });
        });
        return res.status(200).send(Images);
      })
      .catch((error) => {
        res.status(500).send({ error: error });
        console.log(error);
      });
  }
});

// testimonials by dir
router.get(
  "/api/client/v1/testimonial/:_dir",
  (req, res) => {
    if (!req.params._dir) {
      return res.status(422).send("Invalid Params!");
    }
    TestimonialSchema.find({ service_code: req.params._dir })
      .then((result) => {
        return res.status(200).send(result);
      })
      .catch((error) => {
        res.status(401).send({ error: error });
        console.log(error);
      });
  },
  (err) => {
    res.status(500).send({ error: error });
  }
);

/// all testimonials
router.get(
  "/api/client/v1/testimonials",
  (req, res) => {
    if (!req) {
      return res.status(422).send("Invalid Params!");
    }
    TestimonialSchema.find()
      .then((result) => {
        return res.status(200).send(result);
      })
      .catch((error) => {
        res.status(401).send({ error: error });
        console.log(error);
      });
  },
  (err) => {
    res.status(500).send({ error: error });
  }
);

module.exports = router;
