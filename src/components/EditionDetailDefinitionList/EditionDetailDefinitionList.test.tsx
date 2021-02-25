import React from "react";
import EditionDetailDefinitionList from "./EditionDetailDefinitionList";
import "@testing-library/jest-dom/extend-expect";
import { screen, render } from "@testing-library/react";
import { ApiEdition } from "~/src/types/EditionQuery";
const editionDetailFullData: ApiEdition = require("../../__tests__/fixtures/edition-detail.json");

describe("Edition Detail table with all information", () => {
  beforeEach(() => {
    render(
      <EditionDetailDefinitionList
        edition={editionDetailFullData}
      ></EditionDetailDefinitionList>
    );
  });
  test("shows heading", () => {
    expect(
      screen.getByRole("heading", { name: "Details" })
    ).toBeInTheDocument();
  });
  test("Shows publication date", () => {
    expect(screen.getByText("Publication Date")).toBeInTheDocument();
    expect(screen.getByText("2014")).toBeInTheDocument();
  });
  test("Shows publication place", () => {
    expect(screen.getByText("Publication Place")).toBeInTheDocument();
    expect(screen.getByText("Paris")).toBeInTheDocument();
  });
  test("Shows publishers", () => {
    expect(screen.getByText("Publisher(s)")).toBeInTheDocument();
    expect(
      screen
        .getAllByRole("listitem")
        .find((listitem) => listitem.textContent === "Tom Nook, publisher")
    ).toBeInTheDocument();
    expect(
      screen
        .getAllByRole("listitem")
        .find((listitem) => listitem.textContent === "CNRS éditions, publisher")
    ).toBeInTheDocument();
  });
  test("Shows Edition statement", () => {
    expect(screen.getByText("Edition Statement")).toBeInTheDocument();
    expect(
      screen.getByText("Placeholder edition statement")
    ).toBeInTheDocument();
  });
  test("Shows languages", () => {
    expect(screen.getByText("Languages")).toBeInTheDocument();
    expect(
      screen
        .getAllByRole("listitem")
        .find((listitem) => listitem.textContent === "French")
    ).toBeInTheDocument();
    expect(
      screen
        .getAllByRole("listitem")
        .find((listitem) => listitem.textContent === "Undetermined")
    ).toBeInTheDocument();
  });
  test("Shows Table of Contents", () => {
    expect(screen.getByText("Table of Contents")).toBeInTheDocument();
    expect(
      screen.getByText(
        "La marchandisation des services d'eau : les réformes des années 1980-1990. La fragmentation par les réseaux. Géographie des nouveaux assemblages en Afrique subsaharienne. Le pluralisme sans l'équité? L'écartèlement des territoires nationaux. Spatialisation et territorialisation des services d'eau : une inégale fragmentation."
      )
    ).toBeInTheDocument();
  });
  test("shows extent", () => {
    expect(screen.getByText("Extent")).toBeInTheDocument();
    expect(screen.getByText("1 online resource.")).toBeInTheDocument();
  });
  test("shows volume", () => {
    expect(screen.getByText("Volume")).toBeInTheDocument();
    expect(screen.getByText("Volume number")).toBeInTheDocument();
  });
  test("shows summary", () => {
    expect(screen.getByText("Summary")).toBeInTheDocument();
    expect(screen.getByText("Placeholder Summary")).toBeInTheDocument();
  });
});

describe("Edition detail with no data", () => {
  const noDataEditionDetail: ApiEdition = {
    id: 12345,
  };
  beforeEach(() => {
    render(
      <EditionDetailDefinitionList
        edition={noDataEditionDetail}
      ></EditionDetailDefinitionList>
    );
  });
  test("Shows unknown publication date", () => {
    expect(screen.getByText("Publication Date")).toBeInTheDocument();
    expect(screen.getByText("Unknown Date")).toBeInTheDocument();
  });
  test("Shows Unknown publication place", () => {
    expect(screen.getByText("Publication Place")).toBeInTheDocument();
    expect(screen.getByText("Unknown Place")).toBeInTheDocument();
  });
  test("Shows publishers Unavailable", () => {
    expect(screen.getByText("Publisher(s)")).toBeInTheDocument();
    expect(screen.getByText("Publisher Unavailable")).toBeInTheDocument();
  });
  test("Does not show Edition statement", () => {
    expect(screen.queryByText("Edition Statement")).not.toBeInTheDocument();
  });
  test("Does not show languages", () => {
    expect(screen.queryByText("Languages")).not.toBeInTheDocument();
  });
  test("Does not show Table of Contents", () => {
    expect(screen.queryByText("Table of Contents")).not.toBeInTheDocument();
  });
  test("Does not show extent", () => {
    expect(screen.queryByText("Extent")).not.toBeInTheDocument();
  });
  test("Does not show volume", () => {
    expect(screen.queryByText("Volume")).not.toBeInTheDocument();
  });
  test("Does not show summary", () => {
    expect(screen.queryByText("Summary")).not.toBeInTheDocument();
  });
});
