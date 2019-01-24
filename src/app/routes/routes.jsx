import React from 'react';
import { Route, Redirect, IndexRoute } from 'react-router';

import Application from '../components/Application/Application';
import SearchContainer from '../components/SearchContainer/SearchContainer';
import NotFound404 from '../components/Error/NotFound404';
import WorkDetail from '../components/WorkDetail/WorkDetail';
import Home from '../components/Home/Home';

const routes = {
  default: (
    <Route path="/" component={Application}>
      <IndexRoute component={Home} />
      <Route path="/search" component={SearchContainer} />
      <Route path="/work" component={WorkDetail} />
      <Route path="/404" component={NotFound404} />
      <Redirect from="*" to="/404" />
    </Route>
  ),
};

export default routes;
