import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { formatUrl } from '../../util/Util';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import appConfig from '../../../../appConfig';

class EBookViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
    this.props = props;
  }

  componentDidMount() {
    this.parseQueryToState(this.props.location.query);
    this.handleIframeTask = this.handleIframeTask.bind(this);
    window.addEventListener('message', this.handleIframeTask, false);
  }

  handleIframeTask(e) {
    if (e.origin !== this.props.eReaderUrl) {
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
    const { router } = this.context;
    const work = this.props.workDetail && this.props.workDetail.work ? this.props.workDetail.work.data : undefined;
    const bookUrl = this.state.bookUrl;

    return (
      <span>
        <Breadcrumbs
          router={router}
          location={this.props.location}
          searchQuery={this.props.searchQuery}
          workDetail={work}
        />
        <span>
          {bookUrl
      && (
      <iframe
        allowFullScreen
        scrolling="no"
        src={`${formatUrl(bookUrl, process.env.APP_ENV)}`}
        title="Ebook Frame"
      />
      ) }
        </span>
      </span>
    );
  }
}


EBookViewer.propTypes = {
  location: PropTypes.objectOf(PropTypes.any),
  workDetail: PropTypes.objectOf(PropTypes.any),
  searchQuery: PropTypes.objectOf(PropTypes.any),
  eReaderUrl: PropTypes.string,
};

EBookViewer.defaultProps = {
  location: {},
  workDetail: {},
  searchQuery: {},
  eReaderUrl: appConfig.ereader[process.env.APP_ENV],
};

EBookViewer.contextTypes = {
  router: PropTypes.objectOf(PropTypes.any),
  history: PropTypes.objectOf(PropTypes.any),
};

const mapStateToProps = state => state;

export default connect(mapStateToProps, null)(withRouter(EBookViewer));
