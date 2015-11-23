require('babel/polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  app: {
    title: 'Zehut Ignite',
    description: '',
    meta: {
      charSet: 'utf-8',
      property: {
        'og:site_name': 'Zehut Ignite',
        'og:image': '',
        'og:locale': 'en_US',
        'og:title': 'Zehut Ignite',
        'og:description': ''
      }
    }
  }
}, environment);
