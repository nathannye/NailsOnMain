import * as prismicH from '@prismicio/helpers';
import client from './config/prismicConfig.js';
import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
const app = express();
const port = 3000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.locals.ctx = {
    prismicH,
  };
  next();
});

app.get('/*', async (req, res, next) => {
  const menu = await client.getSingle('navigation_menu');
  const footer = await client.getSingle('footer');
  const contact = await client.getSingle('contact');
  const preloader = await client.getSingle('preloader');
  const year = new Date().getFullYear();

  res.locals.year = year;
  res.locals.menu = menu;
  res.locals.footer = footer;
  res.locals.contact = contact;
  res.locals.preloader = preloader;

  next();
});
app.get('/home', async (req, res) => {
  const home = await client.getSingle('home');
  res.render('pages/home', { home });
});

app.get('/', async (req, res) => {
  const home = await client.getSingle('home');
  res.render('pages/home', { home });
});

app.get('/about', async (req, res) => {
  const about = await client.getSingle('about_us');
  res.render('pages/about', { about });
});

app.get('/services', async (req, res) => {
  const services = await client.getSingle('services');
  const s = await client.getAllByType('service_entry');
  res.render('pages/services', { services, s });
});

app.get('/our-team', async (req, res) => {
  const our_team = await client.getSingle('our_team');
  const team_members = await client.getAllByType('team_member');
  res.render('pages/our-team', { our_team, team_members });
});

app.get('*', async (req, res) => {
  const missing = await client.getSingle('404_missing_page');
  res.render('pages/404', { missing });
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
