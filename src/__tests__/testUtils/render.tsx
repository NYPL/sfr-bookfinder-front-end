import { render, RenderOptions } from "@testing-library/react";
import { ReactElement } from "react";
import { FeatureFlagProvider } from "~/src/context/FeatureFlagContext";
import { FeedbackProvider } from "~/src/context/FeedbackContext";

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => {
  render(ui, { wrapper: FeatureFlagProvider, ...options });
};

const customFeedbackRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => {
  render(ui, { wrapper: FeedbackProvider, ...options });
};

export * from "@testing-library/react";
export { customRender as render };
export { customFeedbackRender as feedbackRender };
