import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

import Application from '../components/Application/Application';
import SearchContainer from '../components/SearchContainer/SearchContainer';
import AdvancedSearch from '../components/AdvancedSearch/AdvancedSearch';
import NotFound404 from '../components/Error/NotFound404';
import WorkDetail from '../components/WorkDetail/WorkDetail';
import EBookViewer from '../components/Viewer/EBookViewer';

const routes = {
  default: (
    <Route
      path="/"
      component={Application}
    >
      <IndexRoute component={SearchContainer} />
      <Route
        path="/search"
        component={SearchContainer}
      />
      <Route
        path="/work"
        component={WorkDetail}
      />
      <Route
        path="/advanced-search"
        component={AdvancedSearch}
      />
      <Route
        path="/read-online"
        component={EBookViewer}
      />
      <Route
        path="/404"
        component={NotFound404}
      />
      <Redirect
        from="**"
        to="/404"
      />
    </Route>
  ),
};

export default routes;
