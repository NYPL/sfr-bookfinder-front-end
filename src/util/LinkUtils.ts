const isRefererInternal = (referer: string, host: string) => {
  return referer && referer.includes(host);
};

export const getBackUrl = (referer: string, host: string) => {
  return isRefererInternal(referer, host) ? referer : "/";
};

export const getBackToSearchUrl = (referer: string, host: string) => {
  return isRefererInternal(referer, host) && referer.includes("search")
    ? referer
    : null;
};
