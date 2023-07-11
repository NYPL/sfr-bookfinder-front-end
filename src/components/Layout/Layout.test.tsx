import { screen } from "@testing-library/react";
import React from "react";
import { feedbackRender } from "~/src/__tests__/testUtils/render";
import Layout from "./Layout";
jest.mock("next/router", () => require("next-router-mock"));

describe("Layout component", () => {
  beforeEach(() => {
    feedbackRender(
      <Layout>
        <div>Text in layout body</div>
      </Layout>
    );
  });

  test("should have text in layout body", () => {
    const text = screen.getByText("Text in layout body");
    expect(text).toBeInTheDocument();
  });
});
