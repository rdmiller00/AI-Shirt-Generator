const express = require('express');
const axios = require('axios');
const cors = require('cors');
const fs = require('fs');
const uuid = require('uuid');
const spawn = require("child_process").spawn;
const fileUpload = require('express-fileupload');
const app = express();
const port = 3000;


// default options
app.use(fileUpload());
app.use(cors());
app.use(express.json());

app.post('/', (req, res) => {
    if (!req.body.description) {
        return res.status(400).send("Description is required");
    }
    const config = {
        method: "post",
        url: "https://api.mymidjourney.ai/api/v1/midjourney/imagine",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OTEwMCwiZW1haWwiOiJ0d2Vla293bnpAZ21haWwuY29tIiwidXNlcm5hbWUiOiJ0d2Vla293bnpAZ21haWwuY29tIiwiaWF0IjoxNzA2Mzg5MDM4fQ.WuNCN5qsC6GW8rzeilEHEC0rqrYuAJ8680UHeL-8nqs",
        },
        data: {

            prompt: req.body.description + " , plain white background"

        },
    }
    axios(config)
        .then(function (response) {
            res.send(JSON.stringify(response.data))
        })
        .catch(function (error) {
            res.send(error);
        })
});

app.get('/message/:messageId', (req, res) => {
    console.log(req.params.messageId);

  axios.get(`https://api.mymidjourney.ai/api/v1/midjourney/message/${req.params.messageId}`,
  {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OTEwMCwiZW1haWwiOiJ0d2Vla293bnpAZ21haWwuY29tIiwidXNlcm5hbWUiOiJ0d2Vla293bnpAZ21haWwuY29tIiwiaWF0IjoxNzA2Mzg5MDM4fQ.WuNCN5qsC6GW8rzeilEHEC0rqrYuAJ8680UHeL-8nqs"
    }
  })
    .then(response => {
      res.send(response.data);
    })
    .catch(error => {
      res.send(error);
    });
});

app.post("/process", async (req, res) => {
    if(!req.files.image){
        res.status(400).json({
            msg: "Please input Image"
        })
    }
    const image = req.files.image
    const tmpdir = 'tmp/'
    const filename = uuid.v4()
    
    // Download Image From Internet
    fs.writeFile(`${tmpdir}${filename}.png`, image.data, (err) => {
        if (err) {
          res.status(400).json({
            msg: "image could not be downloaded."
          })  
        }
    });

    // Run REMBG Against Temp Image and Output IMAGENAME_CLEANED.PNG
    const rembg = spawn('rembg',["i", `${tmpdir}${filename}.png`, `${tmpdir}${filename}_cleaned.png`]);
    rembg.on('exit', function (code, signal) {
        if(code == 0){
          data = fs.readFileSync(`${tmpdir}${filename}_cleaned.png`, 'base64');
          res.writeHead(200, {
            'Content-Type': 'image/png',
            'Content-Length': data.length
          });
          res.end(data);
        }
        else{
            res.status(400).json({
                msg: "image could not be processed."
            })
        }
        console.log('child process exited with ' +
                    `code ${code} and signal ${signal}`);
      });
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});


