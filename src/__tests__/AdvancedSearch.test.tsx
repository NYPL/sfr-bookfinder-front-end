import React from "react";
import AdvancedSearch from "../components/AdvancedSearch/AdvancedSearch";
import {
  MockNextRouterContextProvider,
  mockPush,
} from "~/src/__tests__/testUtils/MockNextRouter";
import { render, screen, fireEvent } from "@testing-library/react";
import { FilterLanguagesCommonTests } from "./componentHelpers/FilterLanguages";
import { FilterYearsTests } from "./componentHelpers/FilterYears";
import { FilterFormatTests } from "./componentHelpers/FilterFormats";
import userEvent from "@testing-library/user-event";
import { errorMessagesText, inputTerms } from "../constants/labels";
import { ApiLanguageResponse } from "../types/LanguagesQuery";

const defaultLanguages: ApiLanguageResponse = {
  status: "200",
  data: [
    { language: "english", count: 25 },
    { language: "french", count: 30 },
  ],
};

describe("renders advanced search correctly", () => {
  describe("Renders correctly in when passed well-formed query", () => {
    beforeEach(() => {
      render(<AdvancedSearch languages={defaultLanguages} />);
    });

    describe("Search Fields render", () => {
      test("Search fields are empty", () => {
        expect(screen.getByLabelText("Keyword")).toHaveValue("");
        expect(screen.getByLabelText("Author")).toHaveValue("");
        expect(screen.getByLabelText("Title")).toHaveValue("");
        expect(screen.getByLabelText("Subject")).toHaveValue("");
      });
    });
    describe("Language filter is shown", () => {
      FilterLanguagesCommonTests(screen, defaultLanguages.data, false);
    });
    describe("Year filter is shown", () => {
      FilterYearsTests(false);
    });
    test("Format filter is shown", () => {
      FilterFormatTests();
    });
    test("Submit and clear buttons are shown", () => {
      expect(
        screen.getByRole("button", { name: "Search" })
      ).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Clear" })).toBeInTheDocument();
    });
  });

  test("Hides languages when no languages are passed", () => {
    render(<AdvancedSearch languages={{ status: "200", data: [] }} />);
    expect(
      screen.queryByRole("group", { name: "Languages" })
    ).not.toBeInTheDocument();
  });
});

describe("Advanced Search submit", () => {
  test("Submits well formed query", () => {
    render(
      <MockNextRouterContextProvider>
        <AdvancedSearch languages={defaultLanguages} />
      </MockNextRouterContextProvider>
    );

    const inputValues = {
      Keyword: "cat",
      Author: "Nook",
      Subject: "poetry",
      Title: "Handbook",
    };
    inputTerms.forEach((val) => {
      fireEvent.change(screen.getByLabelText(val.label), {
        target: { value: inputValues[val.label] },
      });
    });

    userEvent.click(screen.getByRole("checkbox", { name: "english" }));
    fireEvent.change(screen.getByRole("spinbutton", { name: "From" }), {
      target: { value: "1990" },
    });
    fireEvent.change(screen.getByRole("spinbutton", { name: "To" }), {
      target: { value: "1999" },
    });
    userEvent.click(screen.getByRole("checkbox", { name: "PDF" }));

    userEvent.click(screen.getByRole("button", { name: "Search" }));

    const expectedQuery = {
      filter: "language:english,startYear:1990,endYear:1999,format:pdf",
      query: "keyword:cat,author:Nook,title:Handbook,subject:poetry",
      readerVersion: "v2",
    };
    expect(mockPush).toHaveBeenCalledTimes(1);
    expect(mockPush).toHaveBeenCalledWith({
      pathname: "/search",
      query: expectedQuery,
    });
  });

  test("Submits only year start and subject", () => {
    render(
      <MockNextRouterContextProvider>
        <AdvancedSearch languages={defaultLanguages} />
      </MockNextRouterContextProvider>
    );

    fireEvent.change(screen.getByRole("spinbutton", { name: "From" }), {
      target: { value: "1990" },
    });
    fireEvent.change(screen.getByLabelText("Keyword"), {
      target: { value: "cat" },
    });

    userEvent.click(screen.getByRole("button", { name: "Search" }));

    const expectedQuery = {
      filter: "startYear:1990",
      query: "keyword:cat",
      readerVersion: "v2",
    };
    expect(mockPush).toHaveBeenCalledTimes(1);
    expect(mockPush).toHaveBeenCalledWith({
      pathname: "/search",
      query: expectedQuery,
    });
  });

  test("Submits only year end and author", () => {
    render(
      <MockNextRouterContextProvider>
        <AdvancedSearch languages={defaultLanguages} />
      </MockNextRouterContextProvider>
    );

    fireEvent.change(screen.getByRole("spinbutton", { name: "To" }), {
      target: { value: "1990" },
    });
    fireEvent.change(screen.getByLabelText("Author"), {
      target: { value: "Shakespeare" },
    });

    userEvent.click(screen.getByRole("button", { name: "Search" }));

    const expectedQuery = {
      filter: "endYear:1990",
      query: "author:Shakespeare",
      readerVersion: "v2",
    };
    expect(mockPush).toHaveBeenCalledTimes(1);
    expect(mockPush).toHaveBeenCalledWith({
      pathname: "/search",
      query: expectedQuery,
    });
  });

  test("shows error on empty query", () => {
    render(
      <MockNextRouterContextProvider>
        <AdvancedSearch languages={defaultLanguages} />
      </MockNextRouterContextProvider>
    );
    userEvent.click(screen.getByRole("button", { name: "Search" }));
    expect(mockPush).toHaveBeenCalledTimes(0);
    expect(screen.getByText(errorMessagesText.emptySearch)).toBeInTheDocument();
  });

  test("show error on invalid year", () => {
    render(
      <MockNextRouterContextProvider>
        <AdvancedSearch languages={defaultLanguages} />
      </MockNextRouterContextProvider>
    );

    fireEvent.change(screen.getByRole("spinbutton", { name: "From" }), {
      target: { value: "1990" },
    });
    fireEvent.change(screen.getByRole("spinbutton", { name: "To" }), {
      target: { value: "1880" },
    });
    fireEvent.change(screen.getByLabelText("Keyword"), {
      target: { value: "cat" },
    });

    userEvent.click(screen.getByRole("button", { name: "Search" }));

    expect(mockPush).toHaveBeenCalledTimes(0);
    expect(screen.getByText(errorMessagesText.invalidDate)).toBeInTheDocument();
  });
});

describe("Advanced Search clear", () => {
  test("clears all searches", () => {
    render(
      <MockNextRouterContextProvider>
        <AdvancedSearch languages={defaultLanguages} />
      </MockNextRouterContextProvider>
    );

    const inputValues = {
      Keyword: "cat",
      Author: "Nook",
      Subject: "poetry",
      Title: "Handbook",
    };
    inputTerms.forEach((val) => {
      fireEvent.change(screen.getByLabelText(val.label), {
        target: { value: inputValues[val.label] },
      });
    });

    userEvent.click(screen.getByRole("checkbox", { name: "english" }));
    fireEvent.change(screen.getByRole("spinbutton", { name: "From" }), {
      target: { value: "1990" },
    });
    fireEvent.change(screen.getByRole("spinbutton", { name: "To" }), {
      target: { value: "1999" },
    });
    userEvent.click(screen.getByRole("checkbox", { name: "PDF" }));

    expect(screen.getByLabelText("english")).toBeChecked();
    expect(screen.getByLabelText("From")).toHaveValue(1990);
    expect(screen.getByLabelText("To")).toHaveValue(1999);
    expect(screen.getByLabelText("PDF")).toBeChecked();

    inputTerms.forEach((val) => {
      expect(screen.getByLabelText(val.label)).toHaveValue(
        inputValues[val.label]
      );
    });

    userEvent.click(screen.getByRole("button", { name: "Clear" }));

    expect(screen.getByLabelText("english")).not.toBeChecked();
    expect(screen.getByLabelText("From")).toHaveValue(null);
    expect(screen.getByLabelText("To")).toHaveValue(null);
    expect(screen.getByLabelText("PDF")).not.toBeChecked();

    inputTerms.forEach((val) => {
      expect(screen.getByLabelText(val.label)).toHaveValue("");
    });

    userEvent.click(screen.getByRole("button", { name: "Search" }));
    expect(mockPush).toHaveBeenCalledTimes(0);
    expect(screen.getByText(errorMessagesText.emptySearch)).toBeInTheDocument();
  });

  test("Deleting search clears it from state", () => {
    render(
      <MockNextRouterContextProvider>
        <AdvancedSearch languages={defaultLanguages} />
      </MockNextRouterContextProvider>
    );

    fireEvent.change(screen.getByLabelText("Keyword"), {
      target: { value: "cat" },
    });

    const keywordInput: HTMLInputElement = screen.getByLabelText(
      "Keyword"
    ) as HTMLInputElement;
    expect(keywordInput).toHaveValue("cat");
    keywordInput.setSelectionRange(0, 3);
    userEvent.type(keywordInput, "{backspace}");
    expect(screen.getByLabelText("Keyword")).toHaveValue("");

    userEvent.click(screen.getByRole("button", { name: "Search" }));
    expect(mockPush).toHaveBeenCalledTimes(0);
    expect(screen.getByText(errorMessagesText.emptySearch)).toBeInTheDocument();
  });
});
