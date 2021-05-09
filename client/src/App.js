import { useState } from 'react';
import axios from 'axios';

function App() {
  const [selectedFile, setSelectedFile] = useState();
  const [filename, setFilename] = useState('');
  const [uploadedImages, setUploadedImages] = useState([]);

  const postImage = async ({image, filename}) => {
    // FormData - https://developer.mozilla.org/en-US/docs/Web/API/FormData
    const formData = new FormData();
    formData.append("image", image);
    formData.append("filename", filename);
  
    const result = await axios.post("http://localhost:5050/images", formData, {
      headers: {'Content-Type': 'multipart/form-data'}
    });

    setUploadedImages([...uploadedImages, {imgKey: result.data.key, imgUrl: result.data.Location}])
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await postImage({image: selectedFile, filename});
    // image urls 
    setSelectedFile();
    setFilename('');
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
            <input type="text" name="name" id="name" onChange={e => setFilename(e.target.value)} />
          </p>
          <p>
            <button type="submit">Upload to S3</button>
          </p>
        </fieldset>
      </form>
      

      { uploadedImages.map( image => (
        <div key={image.imgKey}>
          <img src={image.imgUrl} alt='img' />
        </div>
      ))}
    </div>
  );
}

export default App;
