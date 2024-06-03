require('dotenv').config();
const axios = require('axios');
const express = require('express');

const app = express();

app.get('/', async (req, res) => {
    const code = req.query.code;
    console.log(`Received code: ${code}`);
    
    if (!code) {
        return res.status(400).send('Authorization code is required');
    }

    try {

        // Exchange authorization code for access token
        const tokenResponse = await axios.post('https://zoom.us/oauth/token', null, {
            params: {
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: process.env.REDIRECT_URI // Ensure this matches the redirect URI used during authorization
            },
            headers: {
                'Authorization': `Basic ${Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString('base64')}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        res.send(tokenResponse.data.access_token);


    } catch (error) {
        if (error.response) {
            console.error('Error response data:', error.response.data);
            console.error('Error response status:', error.response.status);
            console.error('Error response headers:', error.response.headers);
        } else if (error.request) {
            console.error('Error request:', error.request);
        } else {
            console.error('Error message:', error.message);
        }
        res.status(500).send('Failed to generate meeting link');
    }
});

app.listen(9000, () => {
    console.log('Listening on port 9000');
});
