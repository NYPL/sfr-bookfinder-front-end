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
    this.parseQueryToState(this.props.location.query);
    this.handleIframeTask = this.handleIframeTask.bind(this);
    window.addEventListener('message', this.handleIframeTask, false);
  }

  handleIframeTask(e) {
    if (e.origin !== 'http://researchnow-webpub-dev.us-east-1.elasticbeanstalk.com:4444') {
      return;
    }
    if (e.data === 'backButtonClicked') {
      if (this.state.referrer) {
        global.window.location.href = `${window.location.origin}${this.state.referrer}`;
      } else {
        global.window.location.href = `${window.location.origin}`;
      }
    }
  }

  parseQueryToState(query) {
    this.setState({ bookUrl: query.url });
    this.setState({ referrer: decodeURI(this.props.location.hash).substring(1) });
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
};

EBookViewer.defaultProps = {
  location: {},
};

const mapStateToProps = state => state;

export default connect(mapStateToProps, null)(withRouter(EBookViewer));
