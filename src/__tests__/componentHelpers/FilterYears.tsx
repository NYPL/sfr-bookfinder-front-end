import React from "react";
import { fireEvent, screen, within } from "@testing-library/react";
import { DateRange } from "~/src/types/SearchQuery";
import userEvent from "@testing-library/user-event";

export const FilterYearsTests = (
  hasApplyButton: boolean,
  filterYears?: DateRange,
  mockPush?: jest.Mock<any, any>
) => {
  test("Renders Filter Years", () => {
    expect(
      screen.getByRole("spinbutton", {
        name: "From",
      })
    ).toHaveValue((filterYears && filterYears.start) || null);
    expect(
      screen.getByRole("spinbutton", {
        name: "To",
      })
    ).toHaveValue((filterYears && filterYears.end) || null);
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
          filters:
            '[{"field":"years","value":{"start":"1990","end":""}},{"field":"show_all","value":false}]',
          queries: '[{"field":"keyword","query":"Animal Crossing"}]',
          per_page: "10",
          page: "1",
          sort: "[]",
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
          filters:
            '[{"field":"years","value":{"start":"","end":"1990"}},{"field":"show_all","value":false}]',
          queries: '[{"field":"keyword","query":"Animal Crossing"}]',
          per_page: "10",
          page: "1",
          sort: "[]",
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
          filters:
            '[{"field":"years","value":{"start":"1990","end":"2000"}},{"field":"show_all","value":false}]',
          queries: '[{"field":"keyword","query":"Animal Crossing"}]',
          per_page: "10",
          page: "1",
          sort: "[]",
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
