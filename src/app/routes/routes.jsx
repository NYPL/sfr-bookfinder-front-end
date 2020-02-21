import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

import Application from '../components/Application/Application';
import AdvancedSearch from '../components/AdvancedSearch/AdvancedSearch';
import NotFound404 from '../components/Error/NotFound404';
import WorkDetail from '../components/WorkDetail/WorkDetail';
import EBookViewer from '../components/Viewer/EBookViewer';
import SearchResultsPage from '../components/SearchResults/SearchResultsPage';
import LandingPage from '../components/LandingPage/LandingPage';
import { License } from '../components/License/License';

const routes = {
  default: (
    <Route
      path="/"
      component={Application}
    >
      <IndexRoute component={LandingPage} />
      <Route
        path="/search"
        component={SearchResultsPage}
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
        path="/license"
        component={License} />
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
