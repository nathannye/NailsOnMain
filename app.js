const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.set('views', './views', 'views');
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('pages/home');
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
