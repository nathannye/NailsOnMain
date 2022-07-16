// node-fetch is used to make network requests to the Prismic Rest API.
// In Node.js Prismic projects, you must provide a fetch method to the
// Prismic client.
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));
const prismic = require('@prismicio/client');

const repoName = 'nails-on-main'; // Fill in your repository name.
const accessToken = process.env.PRISMIC_ACCESS_TOKEN; // If your repository is private, add an access token.

const routes = [
  {
    type: 'home',
    path: '/',
  },
  {
    type: 'our_team',
    path: '/our-team',
  },
  {
    type: 'services',
    path: '/services',
  },
  {
    type: 'about',
    path: '/about',
  },
];

module.exports = {
  client: prismic.createClient(repoName, {
    fetch,
    accessToken,
    routes,
  }),
};

// export const client = prismic.createClient(repoName, {
//   fetch,
//   accessToken,
//   routes,
// });
