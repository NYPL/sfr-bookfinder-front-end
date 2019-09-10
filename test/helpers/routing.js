import { stub } from 'sinon';
import PropTypes from 'prop-types';

const mockRouter = push => ({
  push,
  createHref: stub(),
  replace: stub(),
  go: stub(),
  goBack: stub(),
  goForward: stub(),
  setRouteLeaveHook: stub(),
  isActive: stub(),
});

const mockRouterContext = push => ({
  router: mockRouter(push || stub()),
});

mockRouter.propTypes = {
  push: PropTypes.func,
  createHref: PropTypes.func,
  replace: PropTypes.func,
  go: PropTypes.func,
  goBack: PropTypes.func,
  goForward: PropTypes.func,
  setRouteLeaveHook: PropTypes.func,
  isActive: PropTypes.func,
};

mockRouterContext.propTyps = {
  router: PropTypes.func,
};

export { mockRouter, mockRouterContext };
