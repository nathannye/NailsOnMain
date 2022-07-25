import fetch from 'node-fetch';
import * as prismic from '@prismicio/client';
import 'dotenv/config';

const repoName = process.env.PRISMIC_REPO_NAME;
const accessToken = process.env.PRISMIC_ACCESS_TOKEN;

const routes = [
  {
    type: 'home',
    path: '/',
  },
  {
    type: 'about_us',
    path: '/about',
  },
  {
    type: 'services',
    path: '/services',
  },
  {
    type: 'our_team',
    path: '/our-team',
  },
];

const client = prismic.createClient(repoName, {
  fetch,
  accessToken,
  routes,
});

export default client;
