export const getBackUrl = (referer: string, host: string) => {
  return referer && referer.includes(host) ? referer : "/";
};
