import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './App';
import Who from './containers/Who';
import What from './containers/What';
import Where from './containers/Where';

export default () => (
  <Route path="/" component={App}>
    <IndexRoute component={Who}/>
    <Route path="/who" component={Who}/>
    <Route path="/what" component={What}/>
    <Route path="/where" component={Where}/>
  </Route>
);
