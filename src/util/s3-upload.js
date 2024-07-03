import { s3 } from "./aws-s3-config";

export async function uploadFileToS3(file, key) {
  try {
    const params = {
      Bucket: process.env.REACT_APP_AWS_S3_BUCKET,
      Key: key,
      Body: file,
      ACL: "public-read",
    };
    console.log("params", params);
    const data = await s3.upload(params).promise();
    return data.Key;
  } catch (error) {
    throw error;
  }
}
