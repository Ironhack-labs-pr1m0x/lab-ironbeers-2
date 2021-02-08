const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

// Register the location for handlebars partials here:
hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/beers', async (req, res) => {
  const beers = await punkAPI.getBeers();
  res.render('beers', { beers });
});

app.get('/random-beers', async (req, res) => {
  const randomBeer = await punkAPI.getRandom();
  res.render('random-beer', { randomBeer });
});

app.get('/beers/beer-:id', async (req, res) => {
  const randomBeer = await punkAPI.getBeer(req.params.id);

  res.render('random-beer', { randomBeer });
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
