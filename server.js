const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/weather', async (req, res) => {
    try {
        const apiKey = '7f1beacb3f1e4513aef90038241901';
        const city = req.query.city || 'Astana';
        const units = 'metric';

        const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&units=${units}&q=${city}`);
        const data = response.data;

        const weatherData = {
            location: response.data.location.name,
            temperature: data.current.temp_c,
            condition: data.current.condition.text,
            humidity: data.current.humidity,
            windSpeed: data.current.wind_kph
        };

        res.json(weatherData);
    } catch (error) {
        console.error('Error fetching weather data:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/contact', (req, res) => {
    res.sendFile(__dirname + '/contact.html');
});

app.get('*', (req, res) => {
    res.status(404).sendFile(__dirname + '/404.html');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});