import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Footer from "@nypl/dgx-react-footer";
import * as DS from "@nypl/design-system-react-components";

import { documentTitles } from "~/src/constants/labels";
import Feedback from "~/src/components/Feedback/Feedback";
import Loading from "../Loading/Loading";

/**
 * Container class providing header, footer,
 * and other set up information to all its children.
 */

const Layout: React.FC<any> = ({ children }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const start = () => setLoading(true);
    const end = () => setLoading(false);

    // On the first load, set loading to false
    setLoading(false);

    // Add listeners
    router.events.on("routeChangeStart", start);
    router.events.on("routeChangeComplete", end);
    router.events.on("routeChangeError", end);

    return () => {
      router.events.off("routeChangeStart", start);
      router.events.off("routeChangeComplete", end);
      router.events.off("routeChangeError", end);
    };
  }, [router.events]);

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
    <div className="layout-container nypl-ds nypl--research">
      <Head>
        <title>{setTitle(router)}</title>
      </Head>
      <script
        type="text/javascript"
        src="https://header.nypl.org/dgx-header.min.js?skipNav=mainContent&urls=absolute"
        async
      ></script>
      <div className="app-wrapper add-list-reset">
        {loading ? (
          <>
            <Loading />
            <DS.SkeletonLoader />
          </>
        ) : (
          <>{children}</>
        )}

        <Footer urlType="absolute" />

        {!loading && <Feedback location={router.pathname} />}
      </div>
    </div>
  );
};

export default Layout;
