import { screen, render } from "@testing-library/react";
import ReaderLayout from "./ReaderLayout";
import React from "react";
import linkResult from "../../__tests__/fixtures/link-result.json";

describe("Reader reader layout", () => {
  it("should return you back to DRB page from the back button", async () => {
    render(
      <ReaderLayout linkResult={linkResult} proxyUrl={""} backUrl={"/"} />
    );

    expect(
      screen.getByRole("link", { name: "Digital Research Books Beta" })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("link", { name: "Digital Research Books Beta" })
    ).toHaveAttribute("href", "/");
  });
});
