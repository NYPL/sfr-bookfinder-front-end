/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import Footer from '@nypl/dgx-react-footer';

import appConfig from '../../../../appConfig';
import Loading from './Loading';
import { documentTitles } from '../../constants/labels';
import Feedback from '../Feedback/Feedback';

class Application extends React.Component {
  componentDidMount() {
    this.setTitle();
  }

  componentDidUpdate() {
    this.setTitle();
  }

  setTitle() {
    const { location } = this.props;
    if (location && location.query && location.query.workId) {
      global.document.title = documentTitles.workItem;
    } else if (location && location.query && location.query.query) {
      global.document.title = documentTitles.search;
    } else {
      global.document.title = documentTitles.home;
    }
  }

  render() {
    return (
      <div className="app-wrapper add-list-reset">
        <Loading />
        {React.cloneElement(this.props.children, this.props)}
        <Footer />
        <Feedback location={this.props.location} />
      </div>
    );
  }
}

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
