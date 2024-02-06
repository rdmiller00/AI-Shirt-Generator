import React, { useState, useEffect } from "react";
import axios from "axios";
import catTshirt from "../images/cat-tshirt.jpg";
import catRealism from "../images/cat-realism.jpg";
import catFuturistic from "../images/cat-futuristic.jpg";
import catDavinci from "../images/cat-davinci.jpg";
import RandomFactGenerator from "./RandomFactGenerator";

const initialPrompts = [
  "T-shirt design Cat with sunglasses with a black background",
  "Ultra-realistic cat, wearing round sunglasses",
  "Cat wearing sunglasses, futuristic, high-quality",
  "Cat wearing sunglasses, Leonardo Da Vinci's Mona Lisa",
];

const Prompt = ({ selectedImage, setSelectedImage }) => {
  const [prompt, setPrompt] = useState("");
  const [generatedImage, setGeneratedImage] = useState("");
  const [splitImages, setSplitImages] = useState([
    { dataUrl: catTshirt, filename: "cat-tshirt.jpg" },
    { dataUrl: catRealism, filename: "cat-realism.jpg" },
    { dataUrl: catFuturistic, filename: "cat-futuristic.jpg" },
    { dataUrl: catDavinci, filename: "cat-davinci.jpg" },
  ]);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [showPrompts, setShowPrompts] = useState(true);
  const [showRandomFact, setShowRandomFact] = useState(false); // Added state for showing random fact

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  useEffect(() => {
    if (splitImages.length > 0) {
      setSelectedImage(splitImages[0]);
    }
  }, [splitImages, setSelectedImage]);

  const handleGenerateImage = async () => {
    try {
      const response = await axios.post("http://localhost:3000/", {
        description: prompt,
      });

      console.log(response.data);
      setGeneratedImage(response.data.uri);
      await checkProgressAndFetchImage(response.data.messageId);
    } catch (error) {
      console.log(error);
    }
  };

  const checkProgressAndFetchImage = async (messageId) => {
    try {
      const picture = await axios.get(`http://localhost:3000/message/${messageId}`);
      
      if (picture.data.progress !== 100) {
        console.log("Loading image...");
        setLoadingMessage(
          `Like human art, generative AI art takes time too. Your design is about ${picture.data.progress || 0}% done`
        );
        setShowRandomFact(true); // Set showRandomFact to true when progress is !100%
        await sleep(5000);
        await checkProgressAndFetchImage(messageId);
      } else {
        console.log("Image loaded:", picture.data.uri);
        setGeneratedImage(picture.data.uri);
        await splitImage(picture.data.uri);
        setShowPrompts(false);
        setLoadingMessage("");
        setSplitImages([]);
        setShowRandomFact(false); // Set showRandomFact to false when progress is 100%
      }
    } catch (error) {
      console.log(error);
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

      const newImages = [];

      for (let row = 0; row < 2; row++) {
        for (let col = 0; col < 2; col++) {
          const startX = col * partWidth;
          const startY = row * partHeight;
          context.clearRect(0, 0, partWidth, partHeight);
          context.drawImage(
            image,
            startX,
            startY,
            partWidth,
            partHeight,
            0,
            0,
            partWidth,
            partHeight
          );

          const dataUrl = canvas.toDataURL("image/jpeg");
          newImages.push({
            dataUrl,
            filename: `image${newImages.length}.jpg`,
          });
        }
      }

      setSplitImages((prevSplitImages) => [...prevSplitImages, ...newImages]);
    };
  };

  const handleImageSelect = (index) => {
    setSelectedImage(splitImages[index]);
  };

  return (

    <div className="promptContainer">

<div className="loadingMessageContainer">
      <h3>{loadingMessage}</h3>
      <div className="randomFactContainer">
            {/* Conditional rendering of RandomFactGenerator component */}
            {showRandomFact && <RandomFactGenerator />}
            {/* <RandomFactGenerator /> */}
        </div>
      </div>

<div className="promptInputContainer">
        <input
          className="promptInput"
          placeholder="Enter prompt here! Have fun!"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button className="generateButton" onClick={handleGenerateImage}>
          Generate Image
        </button>
        
      </div>

      

      {/* Split Images with Prompts */}
      {splitImages.map((image, index) => (
        <div key={index} className="imageContainer">
          {/* Prompt */}
          {showPrompts && <p>Prompt: {initialPrompts[index]}</p>}

          {/* Generated Image */}
          <img
            src={image.dataUrl}
            alt={`Generated Image ${index + 1}`}
            className={`newImage ${
              selectedImage === image.filename ? "selected" : ""
            }`}
            onClick={() => handleImageSelect(index)}
          />
        </div>
      ))}
      
    </div>
  );
};

export default Prompt;
