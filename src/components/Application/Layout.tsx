/* eslint-disable react/no-unused-prop-types */
import React from "react";
import { useRouter } from "next/router";
import Footer from "@nypl/dgx-react-footer";

// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '~/config/appConfig' or its cor... Remove this comment to see the full error message
import appConfig from "~/config/appConfig";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '~/src/components/Application/L... Remove this comment to see the full error message
import Loading from "~/src/components/Application/Loading";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '~/src/constants/labels' or its... Remove this comment to see the full error message
import { documentTitles } from "~/src/constants/labels";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '~/src/components/Feedback/Feed... Remove this comment to see the full error message
import Feedback from "~/src/components/Feedback/Feedback";

const setTitle = (location: any) => {
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
};
/**
 * Container class providing header, footer,
 * and other set up information to all its children.
 */

const Layout: React.FC<any> = ({ children }) => {
  const router = useRouter();
  setTitle(router);

  return (
    <div className="app-wrapper add-list-reset">
      <Loading />
      {children}

      <Footer urlType="absolute" />

      <Feedback location={router.pathname} />
    </div>
  );
};

Layout.defaultProps = {
  match: {},
  location: {},
  history: {},
  children: {},
  eReaderUrl: appConfig.ereader[process.env.APP_ENV],
};

export default Layout;
