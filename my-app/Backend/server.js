// server.js
const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const CITIES_FILE = path.join(__dirname, 'cities.json');

// GET /api/cities
app.get('/api/cities', async (req, res) => {
  try {
    const data = await fs.readFile(CITIES_FILE, 'utf8');
    res.json(JSON.parse(data));
  } catch (error) {
    res.status(500).json({ error: 'Failed to read cities data' });
  }
});

// POST /api/cities
app.post('/api/cities', async (req, res) => {
  try {
    const data = await fs.readFile(CITIES_FILE, 'utf8');
    const cities = JSON.parse(data);
    cities.push(req.body);
    await fs.writeFile(CITIES_FILE, JSON.stringify(cities, null, 2));
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save city data' });
  }
});

// DELETE /api/cities/:cityName
app.delete('/api/cities/:cityName', async (req, res) => {
  try {
    const data = await fs.readFile(CITIES_FILE, 'utf8');
    const cities = JSON.parse(data);
    const filteredCities = cities.filter(city => city.cityName !== req.params.cityName);
    await fs.writeFile(CITIES_FILE, JSON.stringify(filteredCities, null, 2));
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove city data' });
  }
});

app.listen(3001, () => {
  console.log('Server running on port 3001');
});