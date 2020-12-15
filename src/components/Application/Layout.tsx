/* eslint-disable react/no-unused-prop-types */
import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "next/router";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module '@nyp... Remove this comment to see the full error message
import Footer from "@nypl/dgx-react-footer";

// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '~/config/appConfig' or its cor... Remove this comment to see the full error message
import appConfig from "~/config/appConfig";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '~/src/components/Application/L... Remove this comment to see the full error message
import Loading from "~/src/components/Application/Loading";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '~/src/constants/labels' or its... Remove this comment to see the full error message
import { documentTitles } from "~/src/constants/labels";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '~/src/components/Feedback/Feed... Remove this comment to see the full error message
import Feedback from "~/src/components/Feedback/Feedback";
import { useEffect } from "react";

type OwnProps = {
  match?: {
    [key: string]: any;
  };
  location?: {
    [key: string]: any;
  };
  history?: {
    [key: string]: any;
  };
  eReaderUrl?: string;
};

type Props = OwnProps & typeof Layout.defaultProps;

/**
 * Container class providing headers, config
 * and other set up information to all its children.
 */

class Layout extends React.Component<Props> {
  static defaultProps: any;

  static contextTypes = {
    router: PropTypes.objectOf(PropTypes.any),
  };

  componentDidMount() {
    this.setTitle();
    const script = document.createElement("script");
    script.src =
      "https://header.nypl.org/dgx-header.min.js?skipNav=mainContent&urls=absolute";
    script.async = false;
    document.body.insertBefore(script, document.body.firstChild);
  }

  setTitle() {
    const location = this.props.location;
    if (location && location.query && location.query.workId) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'document' does not exist on type 'Global... Remove this comment to see the full error message
      global.document.title = documentTitles.workItem;
    } else if (location && location.query && location.query.editionId) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'document' does not exist on type 'Global... Remove this comment to see the full error message
      global.document.title = documentTitles.editionItem;
    } else if (location && location.query && location.query.queries) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'document' does not exist on type 'Global... Remove this comment to see the full error message
      global.document.title = documentTitles.search;
    } else {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'document' does not exist on type 'Global... Remove this comment to see the full error message
      global.document.title = documentTitles.home;
    }
  }

  render() {
    return (
      <div className="app-wrapper add-list-reset">
        <Loading />
        {/* @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call. */}
        {React.cloneElement(this.props.children, this.props)}

        <Footer urlType="absolute" />

        <Feedback location={this.props.location} />
      </div>
    );
  }
}

Layout.defaultProps = {
  match: {},
  location: {},
  history: {},
  children: {},
  eReaderUrl: appConfig.ereader[process.env.APP_ENV],
};

export default withRouter(Layout);
