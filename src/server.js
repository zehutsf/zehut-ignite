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
import { Router } from 'react-router';
import createHistory from 'history/lib/createMemoryHistory';
import createRoutes from './routes';

const pretty = new PrettyError();
const app = new Express();
const server = new http.Server(app);

app.use(compression());
app.use(Express.static(path.join(__dirname, '..', 'static')));

app.use((req, res) => {
  if (__DEVELOPMENT__) {
    // Do not cache webpack stats: the script file would change since
    // hot module replacement is enabled in the development env
    webpackIsomorphicTools.refresh();
  }

  const component = (
    <Router history={createHistory()}>
      {createRoutes()}
    </Router>
  );

  res.send('<!doctype html>\n' +
    ReactDOM.renderToString(
      <Html assets={webpackIsomorphicTools.assets()} component={component}/>));
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
