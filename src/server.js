import Express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import config from './config';
import favicon from 'serve-favicon';
import compression from 'compression';
import httpProxy from 'http-proxy';
import path from 'path';
import Html from './Html';
import PrettyError from 'pretty-error';
import http from 'http';
import App from './App';
import Party from './components/Party';

const pretty = new PrettyError();
const app = new Express();
const server = new http.Server(app);

app.use(compression());
app.use(Express.static(path.join(__dirname, '..', 'static')));

const renderComponent = (req, res, component) => {
  if (__DEVELOPMENT__) {
    // Do not cache webpack stats: the script file would change since
    // hot module replacement is enabled in the development env
    webpackIsomorphicTools.refresh();
  }

  res.send('<!doctype html>\n' +
    ReactDOM.renderToString(
      <Html assets={webpackIsomorphicTools.assets()} component={component}/>));
}

app.get('/party', (req, res) => {
  renderComponent(req, res, <Party/>);
});

app.use((req, res) => {
  renderComponent(req, res, <App/>);
});

if (config.port) {
  server.listen(config.port, (err) => {
    if (err) {
      console.error(err);
    }
    console.info('----\n==> ✅  %s is running', config.app.title);
    console.info('==> 💻  Open http://%s:%s in a browser to view the app.', config.host, config.port);
  });
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}
