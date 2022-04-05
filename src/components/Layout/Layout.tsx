import React, { useEffect, useState } from "react";
import {
  DSProvider,
  SkeletonLoader,
} from "@nypl/design-system-react-components";
import { Header, navConfig } from "@nypl/dgx-header-component";
import Footer from "@nypl/dgx-react-footer";
import Feedback from "~/src/components/Feedback/Feedback";
import { useRouter } from "next/router";

/**
 * Container class providing header, footer,
 * and other set up information to all its children.
 */

const Layout: React.FC<{}> = ({ children }) => {
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

  return (
    <>
      <Header
        urlType="absolute"
        skipNav={{ target: "main-content" }}
        navData={navConfig.current}
      />
      <DSProvider>
        <div className="layout-container">
          <main id="main-content">
            {router.isFallback || loading ? (
              <>
                <SkeletonLoader />
              </>
            ) : (
              <>{children}</>
            )}
          </main>
          {!loading && <Feedback location={router.asPath} />}
        </div>
      </DSProvider>
      <Footer urlType="absolute" />
    </>
  );
};

export default Layout;
