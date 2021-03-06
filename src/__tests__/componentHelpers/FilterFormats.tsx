import { screen, within } from "@testing-library/react";

export const FilterFormatTests = () => {
  const formats = screen.getByRole("group", { name: "Format" });
  expect(formats).toBeInTheDocument();
  expect(
    within(formats).getByRole("checkbox", { name: "ePub" })
  ).not.toBeChecked();
  expect(
    within(formats).getByRole("checkbox", { name: "PDF" })
  ).not.toBeChecked();
  expect(
    within(formats).getByRole("checkbox", { name: "Html" })
  ).not.toBeChecked();
};
