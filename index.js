//for the main server code
const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the Weather App API!');
});

app.get('/api/weather', async (req, res) => {
    const { city } = req.query; // Destructure city from query parameters
    const apiKey = process.env.OPENWEATHER_API_KEY; // Get API key from environment variables

    try {
        // Make sure to use the correct apiKey variable without redeclaring it
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
        
        const response = await axios.get(url); // Fetch data from OpenWeather API
        res.json(response.data); // Send the weather data back to the client
    } catch (error) {
        res.status(500).json({ message: 'Error fetching data', error: error.message });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); // Use backticks for template literals
