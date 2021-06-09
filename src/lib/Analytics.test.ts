/* eslint-disable @typescript-eslint/no-var-requires */
import appConfig from "~/config/appConfig";
import gaUtils from "./Analytics";
const ga = require("react-ga");

jest.mock("react-ga");

describe("gaUtils", () => {
  describe("setupAnalytics", () => {
    beforeEach(() => {
      ga.initialize.mockClear();
    });

    test("it should initialize Google Analytics", () => {
      const isProd = false;
      ga.initialize.mockImplementation(() => "");

      gaUtils.setupAnalytics(isProd);

      expect(ga.initialize).toHaveBeenCalled();
      expect(ga.initialize).toHaveBeenCalledWith(
        appConfig.analytics.development,
        {
          debug: true,
          titleCase: false,
        }
      );
    });
  });

  describe("trackPageview", () => {
    test("it should internally call ga's pageview function to track a url", () => {
      ga.pageview.mockImplementation(() => "");

      gaUtils.trackPageview("url");

      expect(ga.pageview).toHaveBeenCalled();
      expect(ga.pageview).toHaveBeenCalledWith("url");

      ga.pageview.mockClear();
    });
  });

  describe("trackEvent", () => {
    test("it should internally call ga's event function to track events", () => {
      ga.event.mockImplementation(() => "");

      const eventTracker = gaUtils.trackEvent("category");

      eventTracker("action", "label");

      expect(ga.event).toHaveBeenCalled();
      expect(ga.event).toHaveBeenCalledWith({
        category: "category",
        action: "action",
        label: "label",
      });

      ga.event.mockClear();
    });
  });

  describe("setDimension", () => {
    test("it should internally call ga's event function to track events", () => {
      ga.set.mockImplementation(() => "");

      const index = "index";
      const value = "value";

      gaUtils.setDimension({ index, value });

      expect(ga.set).toHaveBeenCalled();
      expect(ga.set).toHaveBeenCalledWith({ index: "value" });

      ga.set.mockClear();
    });
  });

  describe("setDimensions", () => {
    test("it should internally call ga's event function to track events", () => {
      ga.set.mockImplementation(() => "");

      const dimensions = [
        { index: "one", value: "1" },
        { index: "two", value: "2" },
        { index: "three", value: "3" },
      ];

      gaUtils.setDimensions(dimensions);

      expect(ga.set).toHaveBeenCalledTimes(3);
      expect(ga.set).toHaveBeenNthCalledWith(1, { one: "1" });
      expect(ga.set).toHaveBeenNthCalledWith(2, { two: "2" });
      expect(ga.set).toHaveBeenNthCalledWith(3, { three: "3" });

      ga.set.mockClear();
    });
  });
});
