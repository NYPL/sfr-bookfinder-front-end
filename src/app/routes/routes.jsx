import React from 'react';
import { Route, Redirect } from 'react-router';

import Application from '../components/Application/Application';
import NotFound404 from '../components/Error/NotFound404';
import appConfig from '../../../appConfig';

const baseUrl = appConfig.baseUrl;

const routes = {
  server: (
    <Route path="/" component={Application}>
      <Route path="/search" component={Application} />
      <Route path="/404" component={NotFound404} />
      <Redirect from="*" to="/404" />
    </Route>
  ),
  client: (
    <Route path={`${baseUrl}/`} component={Application}>
      <Route path={`${baseUrl}/search`} component={Application} />
      <Route path={`${baseUrl}/404`} component={NotFound404} />
      <Redirect from="*" to={`${baseUrl}/404`} />
    </Route>
  ),
};

export default routes;
