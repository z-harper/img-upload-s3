import { useState } from 'react';
import axios from 'axios';

function App() {
  const [selectedFile, setSelectedFile] = useState();
  const [imgName, setImgName] = useState('');
  const [uploadedImages, setUploadedImages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // get secure s3 url from server
      const result = await axios.get("http://localhost:5050/s3Url");
      let uploadUrl = result.data.s3Url;
      // post image to s3 using generated url from our server
      await axios.put(
        uploadUrl, 
        selectedFile, 
        { headers: {'Content-Type': 'imageFile.type'} }
      );
      // break url at ? to only return url + 32char hex string
      uploadUrl = uploadUrl.split('?')[0];
      const uploadKey = uploadUrl.split('com/')[1];
      console.log(uploadUrl);
      // set new image uplaod in state
      setUploadedImages([...uploadedImages, {imgKey: uploadKey, imgUrl: uploadUrl, imgName: imgName}])
      // can then make post request to our server with image data we want to store ie url, key, name
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>S3 Upload Image Form</legend>
          <p>
            <input type="file" accept="image/*" onChange={e => setSelectedFile(e.target.files[0])} />
          </p>
          <p>
            <label htmlFor="name">Name: </label>
            <input type="text" name="name" id="name" onChange={e => setImgName(e.target.value)} />
          </p>
          <p>
            <button type="submit">Upload to S3</button>
          </p>
        </fieldset>
      </form>
      
      { uploadedImages.map( image => (
        <div key={image.imgKey}>
          <img src={image.imgUrl} alt='img' />
          <p>{image.imgName}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
