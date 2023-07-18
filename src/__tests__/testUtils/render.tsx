import { render, RenderOptions } from "@testing-library/react";
import { ReactElement } from "react";
import { FeatureFlagProvider } from "~/src/context/FeatureFlagContext";

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => {
  render(ui, { wrapper: FeatureFlagProvider, ...options });
};

export * from "@testing-library/react";
export { customRender as render };
