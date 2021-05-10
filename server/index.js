import express from 'express';
import cors from 'cors';
import {generateUploadUrl} from './s3.js';

const app = express();
app.use(cors());

app.listen(5050, () => console.log('Server running on port: 5050'));

// generate an s3 url and send back to client 
app.get('/s3Url', async (req, res) => {
  const s3Url = await generateUploadUrl();  // generate s3 url
  res.send({s3Url});
})