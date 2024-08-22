import React from "react";
import Script from "next/script";

export type NRConfig = {
  agentID: string;
  applicationID: string;
  accountID?: string;
  trustKey?: string;
  licenseKey?: string;
};

export type NRInfo = {
  applicationID: string;
  beacon?: string;
  errorBeacon?: string;
  licenseKey?: string;
  sa?: number;
};

// Default QA configs
const defaultConfig: NRConfig = {
  accountID: "121334",
  trustKey: "121334",
  agentID: "1588858125",
  licenseKey: "NRBR-75b5fdeaf978a4a39e8",
  applicationID: "1447020806",
};
const defaultInfo: NRInfo = {
  beacon: "gov-bam.nr-data.net",
  errorBeacon: "gov-bam.nr-data.net",
  licenseKey: "NRBR-75b5fdeaf978a4a39e8",
  applicationID: "1447020806",
  sa: 1,
};
export const devConfig: NRConfig = {
  agentID: "1588857514",
  applicationID: "1443695682",
};
export const devInfo: NRInfo = {
  applicationID: "1443695682",
};
export const qaConfig: NRConfig = {
  agentID: "1588858125",
  applicationID: "1447020806",
};
export const qaInfo: NRInfo = {
  applicationID: "1447020806",
};

export const prodConfig: NRConfig = {
  agentID: "1588862533",
  applicationID: "1473036261",
};
export const prodInfo: NRInfo = {
  applicationID: "1473036261",
};

export function setup(config: NRConfig, info: NRInfo) {
  if (typeof window.NREUM !== "undefined") {
    window.NREUM.loader_config = { ...defaultConfig, ...config };
    window.NREUM.info = { ...defaultInfo, ...info };
  }
}

// Setup the Newrelic browser agent config for different deploy environment,
// Monitor only the staging and production site
export function NewRelicBrowserSetup(environment) {
  if (environment === "development") {
    setup(devConfig, devInfo);
  } else if (environment === "qa") {
    setup(qaConfig, qaInfo);
  } else if (environment === "production") {
    setup(prodConfig, prodInfo);
  }
}

// This code only embeds the new relic library to the browser, to enable the monitoring, invoke the NewRelicBrowserSetup() function to start.
export const NewRelicSnippet = () => {
  if (!process.env.NEW_RELIC_LICENSE_KEY || process.env.APP_ENV === "testing")
    return null;
  return (
    <Script
      type="text/javascript"
      src="/newrelic-browser.js"
      onLoad={() => {
        if (window !== undefined && process.env.NEW_RELIC_LICENSE_KEY) {
          NewRelicBrowserSetup(process.env.APP_ENV);
        }
      }}
    />
  );
};

export default NewRelicSnippet;
