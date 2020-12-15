import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import { formatUrl } from '~/src/util/Util';
import Breadcrumbs from '~/src/components/Breadcrumbs/Breadcrumbs';
import appConfig from '~/config/appConfig';

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
    const edition = this.props.location.state ? this.props.location.state.edition : undefined;
    const bookUrl = this.state.bookUrl;

    return (
      <span>
        <Breadcrumbs
          router={router}
          location={this.props.location}
          workDetail={edition ? { uuid: edition.work_uuid, title: edition.title } : undefined}
          editionDetail={edition ? { id: edition.id, publication_date: edition.publication_date } : undefined}
        />
        <span>
          {bookUrl
      && (
      <iframe
        allowFullScreen
        src={`${formatUrl(bookUrl)}`}
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
  eReaderUrl: PropTypes.string,
};

EBookViewer.defaultProps = {
  location: {},
  eReaderUrl: appConfig.ereader[process.env.APP_ENV],
};

EBookViewer.contextTypes = {
  router: PropTypes.objectOf(PropTypes.any),
  history: PropTypes.objectOf(PropTypes.any),
};

const mapStateToProps = state => state;

export default connect(mapStateToProps, null)(withRouter(EBookViewer));
