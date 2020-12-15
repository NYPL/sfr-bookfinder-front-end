/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import Footer from '@nypl/dgx-react-footer';


import appConfig from '~/config/appConfig';
import Loading from '~/src/components/Application/Loading';
import { documentTitles } from '~/src/constants/labels';
import Feedback from '~/src/components/Feedback/Feedback';
import { useEffect } from 'react';

/**
 * Container class providing headers, config 
 * and other set up information to all its children.
 */

class Layout extends React.Component {

  componentDidMount() {
    this.setTitle();
    const script = document.createElement("script");
    script.src = "https://header.nypl.org/dgx-header.min.js?skipNav=mainContent&urls=absolute";
    script.async = false;
    document.body.insertBefore(script, document.body.firstChild);
  }

  setTitle() {
    const location = this.props.location;
    if (location && location.query && location.query.workId) {
      global.document.title = documentTitles.workItem;
    } else if (location && location.query && location.query.editionId) {
      global.document.title = documentTitles.editionItem;
    } else if (location && location.query && location.query.queries) {
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
        <Footer urlType="absolute" />
        <Feedback location={this.props.location} />
      </div>
    );
  }
}

Layout.propTypes = {
  match: PropTypes.objectOf(PropTypes.any),
  location: PropTypes.objectOf(PropTypes.any),
  history: PropTypes.objectOf(PropTypes.any),
  children: PropTypes.objectOf(PropTypes.any),
  eReaderUrl: PropTypes.string,
};

Layout.defaultProps = {
  match: {},
  location: {},
  history: {},
  children: {},
  eReaderUrl: appConfig.ereader[process.env.APP_ENV],
};

Layout.contextTypes = {
  router: PropTypes.objectOf(PropTypes.any),
};

export default withRouter(Layout);
