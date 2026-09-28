
const express = require('express');
const axios = require('axios');
const app = express();
const API_URL = 'https://www.thecocktaildb.com/api/json/v1/1';

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
// Home page: shows the form
app.get('/', (req, res) => {
  res.render('index', { error: null });
});

// call the API
app.post('/search', async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/search.php`, {
      params: { s: req.body.drink }
    });
    const drinks = response.data.drinks;

    if (!drinks) {
      return res.render('index', { error: 'No drinks found. Try again.' });
    }
    res.render('result', { drinks });
  } catch (err) {
    console.error(err.message);
    res.render('index', { error: 'Something went wrong. Please try again.' });
  }
});
// start server
app.listen(3000, () => console.log('Server running on port 3000'));
