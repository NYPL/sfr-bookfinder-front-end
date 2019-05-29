/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import Footer from '@nypl/dgx-react-footer';
import appConfig from '../../../../appConfig';
import Loading from './Loading';

const Application = props => (
  <div className="app-wrapper add-list-reset">
    <Loading />
    {React.cloneElement(props.children, props)}
    <Footer />
  </div>
);

Application.propTypes = {
  match: PropTypes.objectOf(PropTypes.any),
  location: PropTypes.objectOf(PropTypes.any),
  history: PropTypes.objectOf(PropTypes.any),
  children: PropTypes.objectOf(PropTypes.any),
  eReaderUrl: PropTypes.string,
};

Application.defaultProps = {
  match: {},
  location: {},
  history: {},
  children: {},
  eReaderUrl: appConfig.ereader[process.env.APP_ENV],
};

Application.contextTypes = {
  router: PropTypes.objectOf(PropTypes.any),
};

export default withRouter(Application);
