import S3 from 'aws-sdk/clients/s3.js';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

// Note: these parameters are used in requests and variable names cannot be changed
const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

// create new s3 instance
const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey
})

// Upload file to s3
export const uploadToS3 = (file) => {
  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename,
    ContentType: 'image/jpeg'
  }

  return s3.upload(uploadParams).promise();
}



