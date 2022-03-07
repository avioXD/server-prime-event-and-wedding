const mongoose = require("mongoose");
const path = require("path");
const dotEnv = require("dotenv");

dotEnv.config({ path: path.join(__dirname, "../config.env") });

const mongooseState = mongoose
  .connect(process.env.DB_CONNECT)
  .then(() => {
    console.log("Atlas DB connection successful");
  })
  .catch((e) => {
    console.log("DB connection Error: " + e);
  });

const clientRequestsSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  event_type: {
    type: String,
    require: true,
  },
  describe: {
    type: String,
    require: true,
  },
  time: Date,
});

const clientReviewsSchema = mongoose.Schema({
  name: {
    type: String,
  },
  feedback: {
    type: String,
  },
  img_url: String,
  stars: {
    type: Number,
    require: true,
  },
  time: {
    type: Date,
  },
});

const galleryStoreSchema = mongoose.Schema({
  service_code: {
    type: String,
    require: true,
  },
  images: [Object],
});

const testimonialSchema = mongoose.Schema({
  service_code: String,
  image: String,
  feedback: String,
  date: Date,
  stars: Number,
  name: String,
});

const GallerySchema = mongoose.model(
  "GALLERY_SCHEMA",
  galleryStoreSchema,
  "GALLERY_SCHEMA"
);
const ClientRequests = mongoose.model(
  "CLIENT_REQUEST_SCHEMA",
  clientRequestsSchema,
  "CLIENT_REQUEST_SCHEMA"
);
const ClientReview = mongoose.model(
  "CLIENT_REVIEWS_SCHEMA",
  clientReviewsSchema,
  "CLIENT_REVIEWS_SCHEMA"
);
const TestimonialSchema = mongoose.model(
  "TESTIMONIAL_SCHEMA",
  testimonialSchema,
  "TESTIMONIAL_SCHEMA"
);
module.exports.GallerySchema = GallerySchema;
module.exports.ClientReview = ClientReview;
module.exports.ClientRequests = ClientRequests;
module.exports.TestimonialSchema = TestimonialSchema;
module.exports.mongooseState = mongooseState;
