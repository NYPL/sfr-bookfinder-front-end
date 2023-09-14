import React from "react";
import AdvancedSearch from "../components/AdvancedSearch/AdvancedSearch";
import { render, screen, fireEvent } from "@testing-library/react";
import { FilterLanguagesCommonTests } from "./componentHelpers/FilterLanguages";
import { FilterYearsTests } from "./componentHelpers/FilterYears";
import { FilterFormatTests } from "./componentHelpers/FilterFormats";
import userEvent from "@testing-library/user-event";
import { errorMessagesText, inputTerms } from "../constants/labels";
import { ApiLanguageResponse } from "../types/LanguagesQuery";
import mockRouter from "next-router-mock";
jest.mock("next/router", () => require("next-router-mock"));

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
    test("Gov doc filter is shown", () => {
      const govDocCheckbox = screen.getByRole("checkbox", {
        name: "Show only US government documents",
      });
      expect(govDocCheckbox).toBeInTheDocument();
      expect(govDocCheckbox).not.toBeChecked();
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
  test("Submits well formed query", async () => {
    render(<AdvancedSearch languages={defaultLanguages} />);

    const inputValues = {
      Keyword: "cat",
      Author: "Nook",
      Subject: "poetry",
      Title: "Handbook",
    };

    await userEvent.click(
      await screen.findByRole("checkbox", { name: "english" })
    );
    inputTerms.forEach((val) => {
      fireEvent.change(screen.getByLabelText(val.text), {
        target: { value: inputValues[val.text] },
      });
    });
    fireEvent.change(screen.getByRole("spinbutton", { name: "From" }), {
      target: { value: "1990" },
    });
    fireEvent.change(screen.getByRole("spinbutton", { name: "To" }), {
      target: { value: "1999" },
    });
    await userEvent.click(screen.getByRole("checkbox", { name: "Readable" }));

    await userEvent.click(screen.getByRole("button", { name: "Search" }));

    const expectedQuery = {
      filter: "language:english,startYear:1990,endYear:1999,format:readable",
      query: "keyword:cat,author:Nook,title:Handbook,subject:poetry",
    };
    expect(mockRouter).toMatchObject({
      pathname: "/search",
      query: expectedQuery,
    });
  });

  test("Submits only year start and subject", async () => {
    render(<AdvancedSearch languages={defaultLanguages} />);

    fireEvent.change(screen.getByRole("spinbutton", { name: "From" }), {
      target: { value: "1990" },
    });
    fireEvent.change(screen.getByLabelText("Keyword"), {
      target: { value: "cat" },
    });

    await userEvent.click(screen.getByRole("button", { name: "Search" }));

    const expectedQuery = {
      filter: "startYear:1990",
      query: "keyword:cat",
    };
    expect(mockRouter).toMatchObject({
      pathname: "/search",
      query: expectedQuery,
    });
  });

  test("Submits only year end and author", async () => {
    render(<AdvancedSearch languages={defaultLanguages} />);

    fireEvent.change(screen.getByRole("spinbutton", { name: "To" }), {
      target: { value: "1990" },
    });
    fireEvent.change(screen.getByLabelText("Author"), {
      target: { value: "Shakespeare" },
    });

    await userEvent.click(screen.getByRole("button", { name: "Search" }));

    const expectedQuery = {
      filter: "endYear:1990",
      query: "author:Shakespeare",
    };
    expect(mockRouter).toMatchObject({
      pathname: "/search",
      query: expectedQuery,
    });
  });

  test("shows error on empty query", async () => {
    render(<AdvancedSearch languages={defaultLanguages} />);
    await userEvent.click(screen.getByRole("button", { name: "Search" }));
    expect(mockRouter).toMatchObject({});
    expect(screen.getByText(errorMessagesText.emptySearch)).toBeInTheDocument();
  });

  test("show error on invalid year", async () => {
    render(<AdvancedSearch languages={defaultLanguages} />);

    fireEvent.change(screen.getByRole("spinbutton", { name: "From" }), {
      target: { value: "1990" },
    });
    fireEvent.change(screen.getByRole("spinbutton", { name: "To" }), {
      target: { value: "1880" },
    });
    fireEvent.change(screen.getByLabelText("Keyword"), {
      target: { value: "cat" },
    });

    await userEvent.click(screen.getByRole("button", { name: "Search" }));

    expect(mockRouter).toMatchObject({});
    expect(screen.getByText(errorMessagesText.invalidDate)).toBeInTheDocument();
  });
});

describe("Advanced Search clear", () => {
  test("clears all searches", async () => {
    render(<AdvancedSearch languages={defaultLanguages} />);

    const inputValues = {
      Keyword: "cat",
      Author: "Nook",
      Subject: "poetry",
      Title: "Handbook",
    };

    await userEvent.click(screen.getByRole("checkbox", { name: "english" }));
    inputTerms.forEach((val) => {
      fireEvent.change(screen.getByLabelText(val.text), {
        target: { value: inputValues[val.text] },
      });
    });
    fireEvent.change(screen.getByRole("spinbutton", { name: "From" }), {
      target: { value: "1990" },
    });
    fireEvent.change(screen.getByRole("spinbutton", { name: "To" }), {
      target: { value: "1999" },
    });
    await userEvent.click(screen.getByRole("checkbox", { name: "Readable" }));
    await userEvent.click(
      screen.getByRole("checkbox", {
        name: "Show only US government documents",
      })
    );

    expect(screen.getByLabelText("english")).toBeChecked();
    expect(screen.getByLabelText("From")).toHaveValue(1990);
    expect(screen.getByLabelText("To")).toHaveValue(1999);
    expect(screen.getByLabelText("Readable")).toBeChecked();
    expect(
      screen.getByLabelText("Show only US government documents")
    ).toBeChecked();

    inputTerms.forEach((val) => {
      expect(screen.getByLabelText(val.text)).toHaveValue(
        inputValues[val.text]
      );
    });

    fireEvent.click(screen.getByRole("button", { name: "Clear" }));

    expect(screen.getByLabelText("english")).not.toBeChecked();
    expect(screen.getByLabelText("Readable")).not.toBeChecked();
    expect(
      screen.getByLabelText("Show only US government documents")
    ).not.toBeChecked();
    expect(screen.getByLabelText("From")).toHaveValue(null);
    expect(screen.getByLabelText("To")).toHaveValue(null);

    inputTerms.forEach((val) => {
      expect(screen.getByLabelText(val.text)).toHaveValue("");
    });

    await userEvent.click(screen.getByRole("button", { name: "Search" }));
    expect(mockRouter).toMatchObject({});
    expect(screen.getByText(errorMessagesText.emptySearch)).toBeInTheDocument();
  });

  test("Deleting search clears it from state", async () => {
    render(<AdvancedSearch languages={defaultLanguages} />);

    fireEvent.change(screen.getByLabelText("Keyword"), {
      target: { value: "cat" },
    });

    const keywordInput: HTMLInputElement = screen.getByLabelText(
      "Keyword"
    ) as HTMLInputElement;
    expect(keywordInput).toHaveValue("cat");
    await userEvent.clear(keywordInput);
    expect(screen.getByLabelText("Keyword")).toHaveValue("");

    await userEvent.click(screen.getByRole("button", { name: "Search" }));
    expect(mockRouter).toMatchObject({});
    expect(screen.getByText(errorMessagesText.emptySearch)).toBeInTheDocument();
  });
});
