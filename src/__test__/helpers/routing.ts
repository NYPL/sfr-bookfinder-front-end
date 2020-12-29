// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sinon' or its corresponding ty... Remove this comment to see the full error message
import { stub } from "sinon";
import PropTypes from "prop-types";

const mockRouter = (push: any) => ({
  push,
  createHref: stub(),
  replace: stub(),
  go: stub(),
  goBack: stub(),
  goForward: stub(),
  setRouteLeaveHook: stub(),
  isActive: stub(),
  location: { location: "default" },
});

const mockRouterContext = (push: any) => ({
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
  location: PropTypes.objectOf(PropTypes.any),
};

mockRouterContext.propTyps = {
  router: PropTypes.func,
};

export { mockRouter, mockRouterContext };
