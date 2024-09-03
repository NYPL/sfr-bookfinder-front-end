import React from "react";
import { render, RenderOptions } from "@testing-library/react";
import { ReactElement } from "react";
import { FeatureFlagProvider } from "~/src/context/FeatureFlagContext";
import { FeedbackProvider } from "~/src/context/FeedbackContext";

const AllTheProviders = ({ children }) => {
  return (
    <FeedbackProvider>
      <FeatureFlagProvider>{children}</FeatureFlagProvider>
    </FeedbackProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => {
  render(ui, { wrapper: AllTheProviders, ...options });
};

export * from "@testing-library/react";
export { customRender as render };
