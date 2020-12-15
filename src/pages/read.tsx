import React from "react";
import PropTypes from "prop-types";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { connect } from "react-redux";
import { withRouter } from "next/router";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '~/src/util/Util' or its corres... Remove this comment to see the full error message
import { formatUrl } from "~/src/util/Util";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '~/src/components/Breadcrumbs/B... Remove this comment to see the full error message
import Breadcrumbs from "~/src/components/Breadcrumbs/Breadcrumbs";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '~/config/appConfig' or its cor... Remove this comment to see the full error message
import appConfig from "~/config/appConfig";

type OwnEBookViewerProps = {
  location?: {
    [key: string]: any;
  };
  eReaderUrl?: string;
};

type EBookViewerState = any;

type EBookViewerProps = OwnEBookViewerProps & typeof EBookViewer.defaultProps;

class EBookViewer extends React.Component<EBookViewerProps, EBookViewerState> {
  static defaultProps: any;

  static contextTypes = {
    router: PropTypes.objectOf(PropTypes.any),
    history: PropTypes.objectOf(PropTypes.any),
  };

  constructor(props: EBookViewerProps) {
    super(props);
    this.state = {};
    // @ts-expect-error ts-migrate(2540) FIXME: Cannot assign to 'props' because it is a read-only... Remove this comment to see the full error message
    this.props = props;
  }

  componentDidMount() {
    this.parseQueryToState(this.props.location.query);

    this.handleIframeTask = this.handleIframeTask.bind(this);
    window.addEventListener("message", this.handleIframeTask, false);
  }

  handleIframeTask(e: any) {
    if (e.origin !== this.props.eReaderUrl) {
      return;
    }
    if (e.data === "backButtonClicked") {
      if (this.state.referrer) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'window' does not exist on type 'Global'.
        global.window.location.href = `${window.location.origin}${this.state.referrer}`;
      } else {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'window' does not exist on type 'Global'.
        global.window.location.href = `${window.location.origin}`;
      }
    }
  }

  parseQueryToState(query: any) {
    this.setState({ bookUrl: query.url });
    this.setState({
      referrer: decodeURI(this.props.location.hash).substring(1),
    });
  }

  render() {
    const { router } = this.context;
    const edition = this.props.location.state
      ? this.props.location.state.edition
      : undefined;
    const bookUrl = this.state.bookUrl;

    return (
      <span>
        <Breadcrumbs
          router={router}
          location={this.props.location}
          workDetail={
            edition
              ? { uuid: edition.work_uuid, title: edition.title }
              : undefined
          }
          editionDetail={
            edition
              ? { id: edition.id, publication_date: edition.publication_date }
              : undefined
          }
        />

        <span>
          {bookUrl && (
            <iframe
              allowFullScreen
              src={`${formatUrl(bookUrl)}`}
              title="Ebook Frame"
            />
          )}
        </span>
      </span>
    );
  }
}

EBookViewer.defaultProps = {
  location: {},
  eReaderUrl: appConfig.ereader[process.env.APP_ENV],
};

const mapStateToProps = (state: any) => state;

export default connect(mapStateToProps, null)(withRouter(EBookViewer));
