const aws = require("aws-sdk");

const region = process.env.S3_REGION;
const bucketName = process.env.S3_BUCKET_NAME;
const accessKeyId = process.env.S3_ACCESS_KEY_ID;
const secretAccessKey = process.env.S3_SECRET_KEY;

const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
});

module.exports = function (objects) {
  var deleteParam = {
    Bucket: bucketName,
    Delete: objects,
  };

  s3.deleteObjects(deleteParam, function (err, data) {
    if (err) console.log(err, err.stack);
  });
};
