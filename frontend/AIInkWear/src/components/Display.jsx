import React, { useState } from "react";
import axios from "axios";


const Display = (messageId) => {
  const [imageUri, setImageUri] = useState(null);

  const generateImage = () => {

    console.log(`https://api.mymidjourney.ai/api/v1/midjourney/message/${messageId}`);
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
      <button className="GenerateButton" onClick={generateImage}>Generate Image</button>
      {imageUri && <img src={imageUri} alt="Generated Image" />}
    </div>
  );
};

export default Display;
