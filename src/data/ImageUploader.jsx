import React, { useState } from 'react';
import axios from 'axios';

function ImageUploader() {
  const [base64Image, setBase64Image] = useState(null);

  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64Image(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async () => {
    if (base64Image) {
      try {
        const response = await axios.post('http://localhost:8080/images/upload', {
          name: 'example-image', // Replace with your desired image name
          imageData: base64Image,
        },{
          headers: {
            'Context-Type' : 'application/x-www-form-urlencoded'
          }
        });

        console.log('Image uploaded successfully:', response.data);
      } catch (error) {
        console.error('Error during image upload:', error);
      }
    } else {
      console.warn('No image selected for upload.');
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />

      {base64Image && (
        <div>
          <p>Base64 Encoded Image:</p>
          <img src={base64Image} alt="Uploaded" style={{ maxWidth: '100%' }} />
        </div>
      )}

      <button onClick={handleSubmit} disabled={!base64Image}>
        Upload Image
      </button>
    </div>
  );
}

export default ImageUploader;
