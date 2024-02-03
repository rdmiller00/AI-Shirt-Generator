import React from 'react';
import blackShirt from '../images/blackShirt.png';
import greyShirt from '../images/greyShirt.png';
import whiteShirt from '../images/whiteShirt.png';

const BuyButton = ({selectedImage, setSelectedImage}) => {
  
  
  const handleClick = ()  => {
    // Export the base64 image from the canvas
    const base64_image = 'https://cdn.discordapp.com/attachments/1201197890870202378/1201291248095473664/tweekownz_T-Shirt_Design_with_fresh_prince_of_Notre_Dame_with_T_2cdddf92-7efb-4877-b4aa-a50026220575.png?ex=65c948a8&is=65b6d3a8&hm=17fcaaf4cf0ef8159db1a71ac19a226f6dd1db8c05d89205a9882d87ac17688d&';
    
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
        name: "My Image",
        colours: "White,Black,Blue",
        description: "Check out this awesome doodle tee, printed on an organic cotton t-shirt sustainably, using renewable energy. Created via the Teemill API and printed on demand.",
        price: 18,
      }),
    };

    // Send the API request, and redirect the new tab to the URL that is returned
    fetch('https://teemill.com/omnis/v3/product/create', options)
      .then(response => response.json())
      .then(response => window.open(response.url, '_blank'))
      .catch(err => console.error(err));
  };

  
    return (
      <div className="Buy">
      <img src={blackShirt} className="Shirt" alt="Black Shirt" />
      <img src={greyShirt} className="Shirt" alt="Grey Shirt" />
      <img src={whiteShirt} className="Shirt" alt="White Shirt" />
      <button id="buy_button" onClick={handleClick}>
        Buy Now!
      </button>
      {selectedImage && <img src={selectedImage.dataUrl} alt="Selected Image" />}

      </div>
    );
}



export default BuyButton;
