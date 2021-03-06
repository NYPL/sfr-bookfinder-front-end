import React from "react";
import { fireEvent, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Filter } from "~/src/types/SearchQuery";

export const FilterYearsTests = (
  hasApplyButton: boolean,
  startYear?: Filter,
  endYear?: Filter,
  mockPush?: jest.Mock<any, any>
) => {
  test("Renders Filter Years", () => {
    expect(
      screen.getByRole("spinbutton", {
        name: "From",
      })
    ).toHaveValue((startYear && startYear.value) || null);
    expect(
      screen.getByRole("spinbutton", {
        name: "To",
      })
    ).toHaveValue((endYear && endYear.value) || null);
    if (hasApplyButton) {
      expect(screen.getByRole("button", { name: "Apply" })).toBeInTheDocument();
    }
  });

  if (hasApplyButton) {
    test("Submits filters with only 'from' value", () => {
      const yearGroup = screen.getByRole("group", { name: "Publication Year" });
      const fromInput = within(yearGroup).getByRole("spinbutton", {
        name: "From",
      });
      const applyButton = within(yearGroup).getByRole("button", {
        name: "Apply",
      });
      fireEvent.change(fromInput, { target: { value: 1990 } });
      expect(fromInput).toHaveValue(1990);
      userEvent.click(applyButton);

      expect(mockPush).toBeCalledWith({
        pathname: "/search",
        query: {
          filter: "startYear:1990",
          query: "keyword:Animal Crossing",
        },
      });
    });
    test("Submits filters with only 'to' value", () => {
      const yearGroup = screen.getByRole("group", { name: "Publication Year" });
      const toInput = within(yearGroup).getByRole("spinbutton", {
        name: "To",
      });
      const applyButton = within(yearGroup).getByRole("button", {
        name: "Apply",
      });
      fireEvent.change(toInput, { target: { value: 1990 } });
      userEvent.click(applyButton);

      expect(mockPush).toBeCalledWith({
        pathname: "/search",
        query: {
          filter: "endYear:1990",
          query: "keyword:Animal Crossing",
        },
      });
    });

    test("Submits search with both 'from' and 'to'", () => {
      const yearGroup = screen.getByRole("group", { name: "Publication Year" });
      const toInput = within(yearGroup).getByRole("spinbutton", {
        name: "To",
      });
      const fromInput = within(yearGroup).getByRole("spinbutton", {
        name: "From",
      });
      const applyButton = within(yearGroup).getByRole("button", {
        name: "Apply",
      });
      fireEvent.change(fromInput, { target: { value: 1990 } });
      fireEvent.change(toInput, { target: { value: 2000 } });
      userEvent.click(applyButton);

      expect(mockPush).toBeCalledWith({
        pathname: "/search",
        query: {
          filter: "startYear:1990,endYear:2000",
          query: "keyword:Animal Crossing",
        },
      });
    });

    test("shows error text when 'to' is after 'from", () => {
      const yearGroup = screen.getByRole("group", { name: "Publication Year" });
      const toInput = within(yearGroup).getByRole("spinbutton", {
        name: "To",
      });
      const fromInput = within(yearGroup).getByRole("spinbutton", {
        name: "From",
      });
      const applyButton = within(yearGroup).getByRole("button", {
        name: "Apply",
      });
      fireEvent.change(fromInput, { target: { value: 1990 } });
      fireEvent.change(toInput, { target: { value: 1890 } });
      userEvent.click(applyButton);

      expect(
        screen.getByText("Start date must be before End date")
      ).toBeInTheDocument();
      expect(mockPush).not.toBeCalled();
    });
  }
};
