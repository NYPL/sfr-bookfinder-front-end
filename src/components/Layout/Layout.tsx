import React, { useEffect, useState } from "react";
import {
  SkeletonLoader,
  Toggle,
  useColorMode,
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

  const { colorMode, toggleColorMode } = useColorMode();

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
      {colorMode && (
        <Toggle
          bgColor="ui.bg.default"
          borderRadius="32px"
          bottom={{ base: "xs", md: "auto" }}
          boxShadow="0px 0px 12px 0px rgba(0,0,0,0.4)"
          left={{ base: "xs", md: "auto" }}
          paddingEnd="s"
          paddingStart="12px"
          py="xs"
          position="fixed"
          right={{ base: "xs", md: "xs" }}
          top={{ base: "auto", md: "xs" }}
          zIndex="2"
          _dark={{ bgColor: "dark.ui.bg.default" }}
          isChecked={colorMode === "dark"}
          id={"dark-mode-toggle"}
          onChange={toggleColorMode}
          labelText="Toggle Dark Mode"
        />
      )}
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
    </>
  );
};

export default Layout;
