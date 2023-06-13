type PageViewData = {
  name: string;
  section: string;
};

type CtaData = {
  section: string;
  text: string;
  destination: string;
};

let hasInitialPageViewFired = false;
/**
 * trackPageview
 * Track a AA pageview.
 */
export const trackPageview = (pageViewData: PageViewData) => {
  const adobeDataLayer = window.adobeDataLayer || [];
  if (!hasInitialPageViewFired) {
    adobeDataLayer.push({
      disable_page_view: true,
    });
    hasInitialPageViewFired = true;
  }
  adobeDataLayer.push({
    event: "virtual_page_view",
    page_name: pageViewData.name,
    site_section: pageViewData.section,
  });
  console.log(adobeDataLayer);
};

/**
 * trackEvent
 * Create a function to track a specific category of AA events. A convenience
 * function so that `category`, which doens't change, doesn't have to be
 * added every time. Returns a function with the category set. Then you
 * pass in the action and the label to that returned function.
 */
export const trackEvent = (ctaData: CtaData) => {
  const adobeDataLayer = window.adobeDataLayer || [];
  adobeDataLayer.push({
    event_data: null,
  });
  adobeDataLayer.push({
    event: "send_event",
    event_data: {
      name: "cta_click",
      cta_section: ctaData.section,
      cta_text: ctaData.text,
      destination_url: ctaData.destination,
    },
  });
};
