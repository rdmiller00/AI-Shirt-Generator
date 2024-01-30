import React, { useState } from "react";
import axios from "axios";
import ImageSplitter from "./ImageSplitter";


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
        setGeneratedImage(JSON.stringify(response.data));
        let finished = false;
        while(!finished){
          let picture = await axios.get(`http://localhost:3000/message/` + response.data.messageId)
          console.log(picture.data);
          picture.data.uri ? finished = true : false
          console.log("Loading image...")
          if(!finished){
          await sleep(30000)
          }
        }
        console.log(picture.data.uri);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
      <div>
     <ImageSplitter />
    <div>
      <input
        className="promptInput"
        placeholder="T-Shirt......Transparent background"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button className="generateButton" onClick={handleGenerateImage}>
        Generate Image
      </button>
      <div>{generatedImage}</div>
    </div>
    </div>
  );
};
export default Prompt;