import React, { useEffect, useState } from "react";
import {
  DSProvider,
  SkeletonLoader,
} from "@nypl/design-system-react-components";
import Feedback from "~/src/components/Feedback/Feedback";
import { useRouter } from "next/router";
import { Header, navConfig } from "@nypl/dgx-header-component";

/**
 * Container class providing header, footer,
 * and other set up information to all its children.
 */

const Layout: React.FC<{ children; isTestMode?: boolean }> = ({
  children,
  isTestMode = false,
}) => {
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
      <DSProvider>
        {!isTestMode && (
          <Header
            urlType="absolute"
            skipNav={{ target: "main-content" }}
            navData={navConfig.current}
          />
        )}
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
      </DSProvider>
    </>
  );
};

export default Layout;
