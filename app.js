const express = require('express');
require('dotenv').config();
const path = require('path');
const app = express();
const port = 3000;
const client = require('./config/prismicConfig.js');
const prismicH = require('@prismicio/helpers');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.locals.ctx = {
    prismicH,
  };
  next();
});

app.get('/', async (req, res) => {
  res.render('pages/home');
  // const document = await client.getFirst();
  // res.render('home', { document });
});

app.get('/home', (req, res) => {
  res.render('pages/home');
});

app.get('/about', (req, res) => {
  res.render('pages/about');
});

app.get('/services', (req, res) => {
  res.render('pages/services');
});

app.get('/our-team', (req, res) => {
  res.render('pages/our-team');
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
