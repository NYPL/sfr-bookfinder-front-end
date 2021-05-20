/**
 * GA libraries copied over from library-card-app
 */

import ga from "react-ga";
import appConfig from "~/config/appConfig";

interface GaDimension {
  index: string;
  value: string;
}

/**
 * getGoogleGACode
 * Return the Google Analytics code for the production property if isProd is
 * true, or the dev property if isProd is false
 */
export const getGoogleGACode = (isProd: boolean) => {
  const codes = {
    production: appConfig.analytics.production,
    dev: appConfig.analytics.development,
  };
  return isProd ? codes.production : codes.dev;
};

/**
 * GaUtils
 * Google Analytics utility class that wraps the `react-ga` package.
 */
class GaUtils {
  /**
   * trackPageview
   * Track a GA pageview.
   */
  trackPageview = (url: string) => ga.pageview(url);

  /**
   * trackEvent
   * Create a function to track a specific category of GA events. A convenience
   * function so that `category`, which doens't change, doesn't have to be
   * added every time. Returns a function with the category set. Then you
   * pass in the action and the label to that returned function.
   */
  trackEvent = (category: string) => (action: string, label: string) => {
    ga.event({
      category,
      action,
      label,
    });
  };
  /**
   * setDimension
   * Set the dimension for GA. Every dimension includes two properties:
   * the index and the value.
   * First set the dimension in the admin of GA's dashboard
   * so the value could be passed to it.
   */
  setDimension = ({ index, value }: GaDimension) => ga.set({ [index]: value });

  /**
   * setDimensions
   * Set multiple dimensions for GA at once. Each dimension includes two properties:
   * the index and the value.
   * This function takes an array as the argument, the structure will be as such
   * [{ index: index1, value: value1 }, { index: index2, value: value2 }, ...]
   *
   * @param {dimensions} Array
   */
  setDimensions = (dimensions: GaDimension[]) => {
    dimensions.forEach((d) => {
      if (d.index && d.value) {
        ga.set({ [d.index]: d.value });
      }
    });
  };

  /**
   * setupAnalytics
   * Sets up Google Analytics if it's not already set up. Also initializes
   * page view tracking.
   */
  setupAnalytics = (isProd = false) => {
    const gaOpts = { debug: !isProd, titleCase: false };
    ga.initialize(getGoogleGACode(isProd), gaOpts);
    this.trackPageview(window.location.pathname + window.location.search);
  };
}

const gaUtils = new GaUtils();

// Export the tracker with the specific category already set for every event.
export const drbEvents = gaUtils.trackEvent("Digital Research Books");

// Export the main instance.
export default gaUtils;
