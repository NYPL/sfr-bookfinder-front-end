import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Footer from "@nypl/dgx-react-footer";

import appConfig from "~/config/appConfig";
import Loading from "~/src/components/Application/Loading";
import { documentTitles } from "~/src/constants/labels";
import Feedback from "~/src/components/Feedback/Feedback";

/**
 * Container class providing header, footer,
 * and other set up information to all its children.
 */

const Layout: React.FC<any> = ({ children }) => {
  const router = useRouter();

  const setTitle = (location: any) => {
    if (location && location.query && location.query.workId) {
      return documentTitles.workItem;
    } else if (location && location.query && location.query.editionId) {
      return documentTitles.editionItem;
    } else if (location && location.query && location.query.queries) {
      return documentTitles.search;
    } else {
      return documentTitles.home;
    }
  };

  return (
    <div>
      <Head>
        <title>{setTitle(router)}</title>
      </Head>
      <div>
        <script
          type="text/javascript"
          src="https://header.nypl.org/dgx-header.min.js?skipNav=mainContent&urls=absolute"
          async
        ></script>
      </div>
      <div className="app-wrapper add-list-reset">
        <Loading />
        {children}

        <Footer urlType="absolute" />

        <Feedback location={router.pathname} />
      </div>
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
