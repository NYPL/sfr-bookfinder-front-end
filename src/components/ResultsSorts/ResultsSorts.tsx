import React from "react";
import { Label, Select } from "@nypl/design-system-react-components";
import { sortMap, numbersPerPage } from "~/src/constants/sorts";
import { deepEqual } from "~/src/util/Util";
import { Sort } from "~/src/types/DataModel";

const ResultsSorts: React.FC<{
  perPage: number;
  sort: Sort;
  onChangePerPage: (e) => void;
  onChangeSort: (e) => void;
}> = ({ perPage, sort, onChangePerPage, onChangeSort }) => {
  return (
    <fieldset>
      <Label htmlFor="items-per-page" id="per-page-label">
        Items Per Page
      </Label>
      <Select
        id="items-per-page"
        name="ItemsPerPageSelect"
        isRequired={false}
        labelText="Items Per Page Select"
        value={perPage.toString()}
        onChange={(e) => onChangePerPage(e)}
      >
        {numbersPerPage.map((pageNum: string) => {
          return <option key={`per-page-${pageNum}`}>{pageNum}</option>;
        })}
      </Select>
      <Label htmlFor="items-sort-by" id="sort-by-label">
        Sort By
      </Label>
      <Select
        id="sort-by"
        name="SortBySelect"
        isRequired={false}
        labelText="Sort By Select"
        value={Object.keys(sortMap).find((key) =>
          deepEqual(sortMap[key], sort)
        )}
        onChange={(e) => onChangeSort(e)}
      >
        {Object.keys(sortMap).map((sortOption: string) => {
          return (
            <option key={`sort-option-${sortOption}`}>{sortOption}</option>
          );
        })}
      </Select>
    </fieldset>
  );
};

export default ResultsSorts;
