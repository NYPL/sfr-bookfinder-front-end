import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { formatUrl } from '../../util/Util';


class EBookViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.props = props;
  }

  componentDidMount() {
    this.parseQueryToState(this.props.location.query.url);
    this.handleIframeTask = this.handleIframeTask.bind(this);
    window.addEventListener('message', this.handleIframeTask, false);
  }

  handleIframeTask(e) {
    if (e.origin !== 'http://localhost:4444') {
      return;
    }
    if (e.data === 'backButtonClicked') {
      // TODO: if (previous location within ResearchNow app) {
      this.props.router.goBack();
      // } else {
      //   console.log('should go to home');
      // }
    }
  }

  parseQueryToState(url) {
    this.setState({ bookUrl: url });
  }

  render() {
    const bookUrl = this.state.bookUrl;

    return (
      <span>
        {bookUrl
      && (
      <iframe
        allowFullScreen
        scrolling="no"
        src={`${formatUrl(bookUrl)}`}
        title="Ebook Frame"
      />
      ) }
      </span>
    );
  }
}


EBookViewer.propTypes = {
  location: PropTypes.objectOf(PropTypes.any),
  router: PropTypes.objectOf(PropTypes.any),
};

EBookViewer.defaultProps = {
  location: {},
  router: {},
};

const mapStateToProps = state => state;

export default connect(mapStateToProps, null)(withRouter(EBookViewer));
