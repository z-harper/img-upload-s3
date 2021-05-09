import express from 'express';
import cors from 'cors';
import multer from 'multer';
import {uploadToS3} from './s3.js';
import {clearUploads} from './clearUploads.js';

// specify destination for files that are uploaded to server
const upload = multer({ dest: 'uploads/' });

const app = express();
app.use(cors());

app.listen(5050, () => console.log('Server running on port: 5050'));

// Middleware function uploads image file specified by 'image' from App.js to uploads dir
app.post('/images', upload.single('image'), async (req, res) => {
  const file = req.file;
  const result = await uploadToS3(file);  // upload to s3
  clearUploads();  // remove image file from uploads dir
  res.send(result);
})