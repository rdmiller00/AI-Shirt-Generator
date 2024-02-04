import React, { useState, useEffect } from "react";
import axios from "axios";

const Prompt = ({selectedImage, setSelectedImage}) => {
  const [prompt, setPrompt] = useState("");
  const [generatedImage, setGeneratedImage] = useState("");
  const [splitImages, setSplitImages] = useState([]);
  // const [selectedImage, setSelectedImage] = useState(null);
  const [loadingMessage, setLoadingMessage] = useState("");

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  useEffect(() => {
    // This runs once when the component mounts
    if (splitImages.length > 0) {
      setSelectedImage(splitImages[0]);
    }
  }, [splitImages, setSelectedImage]);

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
        setSplitImages([]); // Clear previous split images
        setSelectedImage(null);
        console.log(selectedImage) // Reset selected image
        checkProgressAndFetchImage(response.data.messageId);

      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const checkProgressAndFetchImage = async (messageId) => {
    // messageId = '9853995d-0e0f-4e56-89d0-208fb110f9b0'
    const picture = await axios.get(`http://localhost:3000/message/${messageId}`);
    if (picture.data.progress !== 100) {
      console.log("Loading image...");
      setLoadingMessage(`Like human art, generative AI art takes time too. Your design is about ${picture.data.progress || 0}% done`);
      // if (picture.data.uri !== "undefined") {
      // setGeneratedImage(picture.data.uri)  progress pics
      // }
      await sleep(5000);
      checkProgressAndFetchImage(messageId);
    } else {
      console.log("Image loaded:", picture.data.uri);
      setGeneratedImage(picture.data.uri);
      splitImage(picture.data.uri);
      setLoadingMessage("");
    }
  };

  const splitImage = async (fetchedImageUri) => {
    const image = new Image();
    image.crossOrigin = "Anonymous";
    image.src = fetchedImageUri;

    image.onload = async () => {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      const partWidth = image.width / 2;
      const partHeight = image.height / 2;

      canvas.width = partWidth;
      canvas.height = partHeight;

      for (let row = 0; row < 2; row++) {
        for (let col = 0; col < 2; col++) {
          const startX = col * partWidth;
          const startY = row * partHeight;
          context.clearRect(0, 0, partWidth, partHeight);
          context.drawImage(image, startX, startY, partWidth, partHeight, 0, 0, partWidth, partHeight);
          console.log(startX, startY, partWidth, partHeight);

          const dataUrl = canvas.toDataURL("image/jpeg");
          setSplitImages((prevSplitImages) => [...prevSplitImages, { dataUrl, filename: `image${prevSplitImages.length}.jpg` }]);
          
        }
      }};
  };

  const handleImageSelect = (index) => {
    console.log(index);
    setSelectedImage(splitImages[index]);
    console.log([...splitImages]);
    console.log("Selected Image:", selectedImage);
  };

  return (
    <div>
      <input
        className="promptInput"
        placeholder="Enter prompt here! Have fun!"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      {/* <button className="generateButton" onClick={checkProgressAndFetchImage}>Generate Image</button> */}
      <button className="generateButton" onClick={handleGenerateImage}>Generate Image</button>
        
  
      <br />
      <h2>{loadingMessage}</h2>
      <br />
      {splitImages.map((image, index) => (
        <img
          key={index}
          src={image.dataUrl}
          alt={`Generated Image ${index + 1}`}
          className={`newImage ${selectedImage === image.filename ? "selected" : ""}`}
          onClick={() => handleImageSelect(index)}

        />
      ))}
    </div>
  );
};

export default Prompt;
