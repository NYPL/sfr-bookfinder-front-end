import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import { Header, navConfig } from '@nypl/dgx-header-component';
import Footer from '@nypl/dgx-react-footer';

class Application extends React.Component {
  constructor(props) {
    super(props);

    this.props = props;
  }

  render() {
    return (
      <div className="app-wrapper">
        <Header
          skipNav={{ target: 'mainContent' }}
          navData={navConfig.current}
          urlType="absolute"
        />
        {React.cloneElement(this.props.children, this.props)}
        <Footer />
      </div>
    );
  }
}

Application.propTypes = {
  match: PropTypes.object,
  location: PropTypes.object,
  history: PropTypes.object,
  children: PropTypes.object,
};

Application.defaultProps = {
  match: {},
  location: {},
  history: {},
  children: {},
};

Application.contextType = {
  router: PropTypes.object,
};

export default withRouter(Application);
