import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import * as DS from "@nypl/design-system-react-components";
import { Header, navConfig } from "@nypl/dgx-header-component";
import Footer from "@nypl/dgx-react-footer";
import { documentTitles } from "~/src/constants/labels";
import Feedback from "~/src/components/Feedback/Feedback";
import Loading from "../Loading/Loading";
import appConfig from "~/config/appConfig";
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
        <link rel="icon" href={appConfig.favIconPath} />
        <Header
          skipNav={{ target: "mainContent" }}
          navData={navConfig.current}
        />
      </Head>
      {router.isFallback || loading ? (
        <>
          <Loading />
          <main className="main">
            <DS.SkeletonLoader />
          </main>
        </>
      ) : (
        <>{children}</>
      )}
      {!loading && <Feedback location={router.pathname} />}
      <Footer urlType="absolute" />
    </div>
  );
};

export default Layout;
