import React from 'react';
import blackShirt from '../images/blackShirt.png';
import greyShirt from '../images/greyShirt.png';
import whiteShirt from '../images/whiteShirt.png';

const BuyButton = ({selectedImage, setSelectedImage}) => {
  
  
  const handleClick = ()  => {
    // Export the base64 image from the canvas
    const base64_image = selectedImage.dataUrl;
    
    // You’ll need to replace the API key below with your one, so the checkout has your branding and you get paid. Get your key inside your free teemill.com account. It's ok if the key is in the code as in this context it's a bearer token, and all the endpoint does is use it to return your checkout. If someone scrapes it and uses it in their code, you will just get more money.
    const apiKey = '5N2ikKjsBs79AT1aw5hIcvF5GsIFY1j79aTaGRbG'; 
    
    // Set the fields to submit. image_url is the only required field for the API request. If you want, you can set the product name, description and price. You can also change the product type and colours using item_code and colours. To find an up-to-date list of available options for these fields, visit this endpoint: https://teemill.com/omnis/v3/product/options/
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        image_url: base64_image,
        item_code: "RNA1",
        name: "Aiink Image",
        colours: "Black, Athletic Grey, White",
        description: "Check out this awesome Aiink Ware tee, printed on an organic cotton t-shirt sustainably, using renewable energy. Created via the Teemill API and AiiNKWARE.com.",
        price: 17,
      }),
    };

      // Open a new tab, ready to receive the product URL. 
  var newTab = window.open('about:blank', '_blank');
  newTab.document.write(
    "<body style='background-color:#faf9f9;width:100%;height:100%;margin:0;position:relative;'><img src='https://storage.googleapis.com/teemill-dev-image-bucket/doodle2tee_loader.gif' style='position:absolute;top:calc(50% - 100px);left:calc(50% - 100px);'/></body>"
  );

    // Send the API request, and redirect the new tab to the URL that is returned
  fetch('https://teemill.com/omnis/v3/product/create', options)
  .then(response => response.json())
  .then(response => newTab.location.href = response.url)
  .catch(err => console.error(err));
};

  
  return (
    <div className='BuyContainer'>
      <div className="Buy">
      <button id="buy_button" onClick={handleClick}>Buy Now!</button>
        <div className="ShirtContainer">
          <img src={blackShirt} className="Shirt" alt="Black Shirt" />
          {selectedImage && (
            <img
              src={selectedImage.dataUrl}
              alt="Selected Image"
              className="SelectedImage"
            />
          )}
        </div>
        <div className="ShirtContainer">
          <img src={whiteShirt} className="Shirt" alt="White Shirt" />
          {selectedImage && (
            <img
              src={selectedImage.dataUrl}
              alt="Selected Image"
              className="SelectedImage"
            />
          )}
        </div>
        <div className="ShirtContainer">
          <img src={greyShirt} className="Shirt" alt="Grey Shirt" />
          {selectedImage && (
            <img
              src={selectedImage.dataUrl}
              alt="Selected Image"
              className="SelectedImage"
            />
          )}
        </div>
      </div>
    </div>
  );
};



export default BuyButton;
