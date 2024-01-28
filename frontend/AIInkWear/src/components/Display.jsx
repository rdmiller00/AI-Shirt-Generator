import React, { useState } from "react";
import axios from "axios";

const ImageDisplay = () => {
  const [imageUri, setImageUri] = useState(null);

  // Function to make the initial POST request and get the message ID
  const generateImage = () => {
    // Make the POST request to generate the message ID
    // ...

    // After getting the response, make the GET request to retrieve the image URI
    axios.get(`https://api.mymidjourney.ai/api/v1/midjourney/message/${messageId}`)
      .then(function (response) {
        const fetchedImageUri = response.data.uri;
        setImageUri(fetchedImageUri);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <button onClick={generateImage}>Generate Image</button>
      {imageUri && <img src={imageUri} alt="Generated Image" />}
    </div>
  );
};

export default ImageDisplay;
