import S3 from 'aws-sdk/clients/s3.js';
import dotenv from 'dotenv';
import crypto from 'crypto';
import { promisify } from 'util';
const randomBytes = promisify(crypto.randomBytes);

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
  secretAccessKey,
  signatureVersion: 'v4'
})

// Upload file to s3
export const generateUploadUrl = async () => {
  const rawBytes = await randomBytes(16);  // generate 16 random bytes
  const imageName = rawBytes.toString('hex');  // convert to 32 char hex string

  const params = {
    Bucket: bucketName,
    Key: imageName,
    Expires: 60
  }
  const uploadUrl = await s3.getSignedUrlPromise('putObject', params);
  return uploadUrl;  
}



