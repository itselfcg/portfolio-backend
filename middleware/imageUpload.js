const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const region = process.env.S3_REGION;
const bucketName = process.env.S3_BUCKET_NAME;
const accessKeyId = process.env.S3_ACCESS_KEY_ID;
const secretAccessKey = process.env.S3_SECRET_KEY;

const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
});

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg"
};

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Invalid mime type, only JPEG and PNG"), false);
  }
};

const upload = multer({
  fileFilter: fileFilter,
  storage: multerS3({
    s3: s3,
    bucket: "itzel-contreras",
    ContentType: "image/jpeg",
    ContentDisposition: "inline; filename=filename.jpg",
    metadata: function (req, file, cb) {
      const name = file.originalname.toLowerCase().split(" ").join("-");
      cb(null, { fieldName: name });
    },
    key: function (req, file, cb) {
      const name = file.originalname.toLowerCase().split(" ").join("-");
      const ext = MIME_TYPE_MAP[file.mimetype];
      cb(null, name + "-" + Date.now() + "." + ext);
    },
  }),
});

module.exports = upload.any();
