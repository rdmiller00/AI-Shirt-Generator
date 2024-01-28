//GET Requests function
//ensure good status code
//refresh GET request at intervals
//display images from API
const button = document.getElementById('buy_button');

// Add a click handler to the button
button.addEventListener('click', (e) => {
  e.preventDefault();
  // Export the base64 image from the canvas
  const base64_image = 'https://cdn.discordapp.com/attachments/1201197890870202378/1201247125061775481/tweekownz_T-shirt_design_with_large_realistic_ninja_turtle_and__eda92532-10cc-4350-abcf-494e82eedfe8.png?ex=65c91f90&is=65b6aa90&hm=a21f39e35c115aa142a05b4ee8351dc555d7732f746ada03167cf24fbd317f01&';
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
      description: "Check out this awesome AiiNKWEAR Image, printed on an organic cotton t-shirt sustainably, using renewable energy. Created via the AIINKWEAR API and printed on demand.",
      price: 18,
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
});