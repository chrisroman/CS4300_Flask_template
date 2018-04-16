// @flow
import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import Home from './components/Home';
import 'bootstrap/dist/css/bootstrap.min.css';

const routes: React.Element<any> = (
  <Route path='/' component={App}>
    <IndexRoute component={Home} />
  </Route>
);

export default routes;
