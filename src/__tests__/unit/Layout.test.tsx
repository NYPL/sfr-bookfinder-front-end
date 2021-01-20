import React from "react";
import { render } from "@testing-library/react";
import Layout from "../../components/Layout/Layout";

describe.only("Layout Structure", () => {
  test("NYPL Header and Footer appears", () => {
    render(<Layout />);
    const linkElement = getByText(
      /Instantly deploy your Next\.js site to a public URL with Vercel\./
    );
    expect(linkElement).toBeInTheDocument();
  });

  test("Loading Screen appears when loading", () => {});
  test("Children appears when ready", () => {});
  test("Error screen apepars if errored", () => {});
});
