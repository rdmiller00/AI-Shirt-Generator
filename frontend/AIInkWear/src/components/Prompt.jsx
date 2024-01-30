import React, { useState } from "react";
import axios from "axios";



const Prompt = () => {
  const [prompt, setPrompt] = useState("");
  const [generatedImage, setGeneratedImage] = useState("");

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }


  const handleGenerateImage = () => {
    const config = {
      method: "post",
      url: "http://localhost:3000/",
      data: {
        description: prompt,
      },
    };
    axios(config)
      .then(async function (response) {
        console.log(response.data);
        setGeneratedImage(response.data.uri);
        checkProgressAndFetchImage(response.data.messageId);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

        const checkProgressAndFetchImage = async (messageId) => {
    const picture = await axios.get(`http://localhost:3000/message/${messageId}`);
    if (picture.data.progress !== 100) {
      console.log("Loading image...");
      await sleep(10000);
      checkProgressAndFetchImage(messageId); // Recursive call
    } else {
      console.log("Image loaded:", picture.data.uri);
      setGeneratedImage(picture.data.uri);
    }
  };
  
  return (
    <div>
      <input
        className="promptInput"
        placeholder="Enter prompt here! Have fun!"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button className="generateButton" onClick={handleGenerateImage}>
        Generate Image
      </button>
      {generatedImage && <img src={generatedImage} alt="Generated Image" className="newImage" />}
    </div>
  );
};
export default Prompt;