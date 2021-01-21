import React from "react";
import { screen, render } from "@testing-library/react";
import Layout from "../../components/Layout/Layout";

describe.only("Layout Structure", () => {
  test("Header and Footer appears", () => {
    render(<Layout />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  // test("Loading Screen appears when loading", () => {});
  // test("Content appears when ready", () => {});
  // test("Error screen apepars if errored", () => {});
});
