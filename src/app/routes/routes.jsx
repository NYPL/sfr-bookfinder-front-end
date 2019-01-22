import React from 'react';
import { Route, Redirect } from 'react-router';

import Application from '../components/Application/Application';
import NotFound404 from '../components/Error/NotFound404';

const routes = {
  default: (
    <Route path="/" component={Application}>
      <Route path="/search" component={Application} />
      <Route path="/work" component={Application} />
      <Route path="/404" component={NotFound404} />
      <Redirect from="*" to="/404" />
    </Route>
  ),
};

export default routes;
