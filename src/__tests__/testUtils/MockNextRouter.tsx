import * as React from "react";
import Router from "next/router";
import { RouterContext } from "next/dist/next-server/lib/router-context";
import { NextRouter } from "next/router";

/**
 * Mock for the next/Router import.
 */

export const mockPush = jest.fn().mockImplementation(async () => true);
Router.push = mockPush;

export const MockNextRouterContextProvider: React.FC<{
  router?: Partial<NextRouter>;
  pathName?: string;
  routerQuery?: { [key: string]: string };
}> = ({ router = {}, pathName = "", routerQuery = {}, children }) => {
  const {
    basePath = "",
    route = "",
    pathname = pathName,
    query = routerQuery,
    asPath = "",
    push = mockPush,
    replace = jest.fn().mockImplementation(async () => true),
    reload = jest.fn().mockImplementation(() => null),
    back = jest.fn().mockImplementation(() => null),
    prefetch = jest.fn().mockImplementation(async () => undefined),
    beforePopState = jest.fn().mockImplementation(() => null),
    isFallback = false,
    isReady = null,
    isPreview = null,
    isLocaleDomain = false,
    events = {
      on: () => null,
      off: () => null,
      emit: () => null,
    },
  } = router;
  return (
    <RouterContext.Provider
      value={{
        basePath,
        route,
        pathname,
        query,
        asPath,
        push,
        replace,
        reload,
        back,
        prefetch,
        beforePopState,
        isFallback,
        isReady,
        isPreview,
        events,
        isLocaleDomain,
      }}
    >
      {children}
    </RouterContext.Provider>
  );
};

export default Router;
