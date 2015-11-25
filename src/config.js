// require('babel/polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

const APP_SITE_NAME = 'Zehut Ignite';
const APP_TITLE = 'Zehut Ignite';
const APP_DESCRIPTION = 'A party showcasing startups and entrepreneurs ' +
  'in our community on Chanukah. Our mission is to use the power of ' +
  'community to foster personal and professional development. ' +
  'Startups featuring leaders from our Young Adult community ' +
  'will be on display.';

const APP_URL = 'http://zehutignite.com';
const APP_IMAGE = 'http://zehutignite.com/images/ignite-og.jpg';

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  app: {
    title: APP_TITLE,
    description: APP_DESCRIPTION,
    canonical: APP_URL,
    meta: {
      charSet: 'utf-8',
      property: {
        'og:site_name': APP_SITE_NAME,
        'og:image': APP_IMAGE,
        'og:locale': 'en_US',
        'og:title': APP_TITLE,
        'og:url': APP_URL,
        'og:description': APP_DESCRIPTION,
        'twitter:card': 'summary_large_image',
        'twitter:site': APP_URL,
        'twitter:description': APP_DESCRIPTION,
        'twitter:title': APP_TITLE,
        'twitter:image': APP_IMAGE
      }
    }
  }
}, environment);
