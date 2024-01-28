const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3000;

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
            prompt: "T-Shirt Design with " + req.body.description + " with Transparent background",
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
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
