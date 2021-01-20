import React from "react";
import * as DS from "@nypl/design-system-react-components";
import { Sort } from "~/src/types/SearchQuery";
import { sortMap, numbersPerPage } from "~/src/constants/sorts";
import { deepEqual } from "~/src/util/Util";

const ResultsSorts: React.FC<{
  perPage: number;
  sort: Sort;
  onChangePerPage: (e) => void;
  onChangeSort: (e) => void;
}> = ({ perPage, sort, onChangePerPage, onChangeSort }) => {
  return (
    <fieldset>
      <DS.Label htmlFor="items-per-page" id="per-page-label">
        Items Per Page
      </DS.Label>
      <DS.Select
        id="items-per-page"
        name="ItemsPerPageSelect"
        isRequired={false}
        ariaLabel="Items Per Page Select"
        labelId="per-page-label"
        selectedOption={perPage.toString()}
        onChange={(e) => onChangePerPage(e)}
        onBlur={(e) => onChangePerPage(e)}
      >
        {numbersPerPage.map((pageNum: string) => {
          return <option key={pageNum}>{pageNum}</option>;
        })}
      </DS.Select>
      <DS.Label htmlFor="items-sort-by" id="sort-by-label">
        Sort By
      </DS.Label>
      <DS.Select
        id="sort-by"
        name="SortBySelect"
        isRequired={false}
        ariaLabel="Sort By Select"
        labelId="sort-by-label"
        selectedOption={Object.keys(sortMap).find((key) =>
          deepEqual(sortMap[key], sort)
        )}
        onChange={(e) => onChangeSort(e)}
        onBlur={(e) => onChangeSort(e)}
      >
        {Object.keys(sortMap).map((sortOption: string) => {
          return <option key={sortOption}>{sortOption}</option>;
        })}
      </DS.Select>
    </fieldset>
  );
};

export default ResultsSorts;
