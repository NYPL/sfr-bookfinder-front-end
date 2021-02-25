import React from "react";
import WorkDetailDefinitionList from "./WorkDetailDefinitionList";
import "@testing-library/jest-dom/extend-expect";
import { screen, render } from "@testing-library/react";
import { ApiWork } from "~/src/types/DataModel";

const apiWork: ApiWork = require("../../__tests__/fixtures/work-detail.json");

describe("Work Detail table with all information", () => {
  beforeEach(() => {
    render(
      <WorkDetailDefinitionList work={apiWork}></WorkDetailDefinitionList>
    );
  });
  test("shows heading", () => {
    expect(
      screen.getByRole("heading", { name: "Details" })
    ).toBeInTheDocument();
  });
  test("Alt titles link to title search", () => {
    expect(screen.getByText("Alternative Titles")).toBeInTheDocument();
    expect(screen.getByText("Alt title 1").closest("a").href).toContain(
      `field%22%3A+%22title`
    );
    expect(screen.getByText("Alt title 2").closest("a").href).toContain(
      `field%22%3A+%22title`
    );
  });
  test("shows series and position", () => {
    expect(screen.getByText("Series")).toBeInTheDocument();
    expect(
      screen.getByText("The modern library classics vol. VIII")
    ).toBeInTheDocument();
  });
  test("Authors link to author search", () => {
    expect(screen.getByText("Authors")).toBeInTheDocument();
    expect(
      screen
        .getByText("Dugdale, John, editor, author of introduction")
        .closest("a").href
    ).toContain(`field%22%3A%22viaf`);
    expect(
      screen.getByText("Hawthorne, Nathaniel, author").closest("a").href
    ).toContain(`field%22%3A%22author`);
  });
  test("Subjects link to subject search", () => {
    expect(screen.getByText("Subjects")).toBeInTheDocument();
    expect(screen.getByText("United States").closest("a").href).toContain(
      `field%22%3A+%22subject`
    );
    expect(
      screen.getByText("Collective settlements").closest("a").href
    ).toContain(`field%22%3A+%22subject`);
    expect(screen.getByText("Collective farms").closest("a").href).toContain(
      `field%22%3A+%22subject`
    );
  });
  test("shows languages", () => {
    expect(screen.getByText("Languages")).toBeInTheDocument();
    expect(
      screen
        .getAllByRole("listitem")
        .find((listitem) => listitem.textContent === "English")
    ).toBeInTheDocument();
    expect(
      screen
        .getAllByRole("listitem")
        .find((listitem) => listitem.textContent === "German")
    ).toBeInTheDocument();
    expect(
      screen
        .getAllByRole("listitem")
        .find((listitem) => listitem.textContent === "Undetermined")
    ).toBeInTheDocument();
  });
});

describe("Work Detail table with minimal information", () => {
  const emptyApiWork: ApiWork = {};
  beforeEach(() => {
    render(
      <WorkDetailDefinitionList work={emptyApiWork}></WorkDetailDefinitionList>
    );
  });
  test("shows heading", () => {
    expect(
      screen.getByRole("heading", { name: "Details" })
    ).toBeInTheDocument();
  });
  test("Alt titles does not show up", () => {
    expect(screen.queryByText("Alternative Titles")).not.toBeInTheDocument();
  });
  test("Does not show series", () => {
    expect(screen.queryByText("Series")).not.toBeInTheDocument();
  });
  test("Shows Unknown authors", () => {
    expect(screen.getByText("Authors")).toBeInTheDocument();
  });
  test("Does not show subjects", () => {
    expect(screen.queryByText("Subjects")).not.toBeInTheDocument();
  });
  test("Does not show languages", () => {
    expect(screen.queryByText("Languages")).not.toBeInTheDocument();
  });
});

describe("Work detail edge cases", () => {
  test("Eliminates duplicated subjects", () => {
    const duplicateSubjectWork: ApiWork = {
      subjects: [
        {
          subject: "United States",
          authority: "fast",
          uri: "1204155",
        },
        {
          subject: "United States",
          authority: "fast",
          uri: "1204155",
        },
      ],
    };
    render(
      <WorkDetailDefinitionList
        work={duplicateSubjectWork}
      ></WorkDetailDefinitionList>
    );

    expect(screen.getByText("Subjects")).toBeInTheDocument();
    expect(screen.getAllByText("United States").length).toEqual(1);
  });

  test("Shows series without position", () => {
    const workWithSeries: ApiWork = {
      series: "Animal Crossing",
    };
    render(
      <WorkDetailDefinitionList
        work={workWithSeries}
      ></WorkDetailDefinitionList>
    );

    expect(screen.getByText("Series")).toBeInTheDocument();
    expect(screen.getByText("Animal Crossing")).toBeInTheDocument();
  });
});
