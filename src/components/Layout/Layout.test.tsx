import React from "react";
import Layout from "./Layout";
import { MockNextRouterContextProvider } from "~/src/__tests__/testUtils/MockNextRouter";
import { mount, configure } from "enzyme";
import Footer from "@nypl/dgx-react-footer";
import Feedback from "~/src/components/Feedback/Feedback";
import Loading from "~/src/components/Loading/Loading";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe("Layout Structure", () => {
  const testChild = <div id="test-id"> children </div>;

  test("Header, Footer and loading screen appears", () => {
    const wrapper = mount(
      <MockNextRouterContextProvider>
        <Layout>{testChild}</Layout>
      </MockNextRouterContextProvider>
    );
    //The header is fetched via a script.
    const script = wrapper.find("script");
    expect(script.prop("src")).toContain("header.nypl.org");

    expect(wrapper.find(Footer)).toHaveLength(1);

    expect(wrapper.find("#test-id")).toHaveLength(1);
    expect(wrapper.find(Feedback)).toHaveLength(1);

    expect(wrapper.exists(Loading)).toEqual(false);
  });

  // test("Shows loading page when the route changes ", async () => {
  //   const wrapper = shallow(
  //     <MockNextRouterContextProvider>
  //       <Layout>{testChild}</Layout>
  //     </MockNextRouterContextProvider>
  //   );

  //   Router.events.emit("routeChangeStart");

  //   // The children are not shown
  //   expect(wrapper.exists("#test-id")).toEqual(false);

  //   // Loading appears
  //   expect(wrapper.find(Loading)).toHaveLength(1);
  // });

  // test("Error screen apepars if errored", () => {});
});
