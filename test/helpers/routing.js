import { stub } from 'sinon';
import * as React from 'react';
import PropTypes from 'prop-types';

export const mockRouter = push => ({
  push,
  createHref: stub(),
  replace: stub(),
  go: stub(),
  goBack: stub(),
  goForward: stub(),
  setRouteLeaveHook: stub(),
  isActive: stub(),
});

export const mockRouterContext = push => ({
  router: mockRouter(push || stub()),
});
