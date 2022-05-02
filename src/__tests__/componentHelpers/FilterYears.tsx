import React from "react";
import { fireEvent, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Filter } from "~/src/types/SearchQuery";
import { MemoryRouter } from "next-router-mock";

export const FilterYearsTests = (
  hasApplyButton: boolean,
  startYear?: Filter,
  endYear?: Filter,
  mockRouter?: MemoryRouter
) => {
  test("Renders Filter Years", () => {
    expect(
      screen.getByRole("spinbutton", {
        name: "From From",
      })
    ).toHaveValue((startYear && startYear.value) || null);
    expect(
      screen.getByRole("spinbutton", {
        name: "To To",
      })
    ).toHaveValue((endYear && endYear.value) || null);
    if (hasApplyButton) {
      expect(
        screen.getAllByRole("button", { name: "Apply" })[0]
      ).toBeInTheDocument();
    }
  });

  if (hasApplyButton) {
    test("Submits filters with only 'from' value", () => {
      const yearGroup = screen.getAllByRole("group", {
        name: "Publication Year",
      })[0];
      const fromInput = within(yearGroup).getByRole("spinbutton", {
        name: "From From",
      });
      const applyButton = within(yearGroup).getByRole("button", {
        name: "Apply",
      });
      fireEvent.change(fromInput, { target: { value: 1990 } });
      expect(fromInput).toHaveValue(1990);
      userEvent.click(applyButton);

      expect(mockRouter).toMatchObject({
        pathname: "/search",
        query: {
          filter: "startYear:1990",
          query: "keyword:Animal Crossing",
        },
      });
    });
    test("Submits filters with only 'to' value", () => {
      const yearGroup = screen.getAllByRole("group", {
        name: "Publication Year",
      })[0];
      const toInput = within(yearGroup).getByRole("spinbutton", {
        name: "To To",
      });
      const applyButton = within(yearGroup).getByRole("button", {
        name: "Apply",
      });
      fireEvent.change(toInput, { target: { value: 1990 } });
      userEvent.click(applyButton);

      expect(mockRouter).toMatchObject({
        pathname: "/search",
        query: {
          filter: "endYear:1990",
          query: "keyword:Animal Crossing",
        },
      });
    });

    test("Submits search with both 'from' and 'to'", () => {
      const yearGroup = screen.getAllByRole("group", {
        name: "Publication Year",
      })[0];
      const toInput = within(yearGroup).getByRole("spinbutton", {
        name: "To To",
      });
      const fromInput = within(yearGroup).getByRole("spinbutton", {
        name: "From From",
      });
      const applyButton = within(yearGroup).getByRole("button", {
        name: "Apply",
      });
      fireEvent.change(fromInput, { target: { value: 1990 } });
      fireEvent.change(toInput, { target: { value: 2000 } });
      userEvent.click(applyButton);

      expect(mockRouter).toMatchObject({
        pathname: "/search",
        query: {
          filter: "startYear:1990,endYear:2000",
          query: "keyword:Animal Crossing",
        },
      });
    });

    test("shows error text when 'to' is after 'from", () => {
      const yearGroup = screen.getAllByRole("group", {
        name: "Publication Year",
      })[0];
      const toInput = within(yearGroup).getByRole("spinbutton", {
        name: "To To",
      });
      const fromInput = within(yearGroup).getByRole("spinbutton", {
        name: "From From",
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
      expect(mockRouter).toMatchObject({});
    });
  }
};
