import AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_S3_ACCESS_KEY,
  secretAccessKey: process.env.REACT_APP_AWS_S3_SECRET_KEY,
});

export const s3 = new AWS.S3({
  apiVersion: "2006-03-01",
  params: { Bucket: process.env.REACT_APP_AWS_S3_BUCKET },
});
