import React from "react";
import {
  Fieldset,
  LabelPositions,
  Select,
} from "@nypl/design-system-react-components";
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
    <Fieldset
      id="sort-fieldset"
      border="none"
      display="flex"
      alignItems="center"
      flexDir="row"
      justifyContent="flex-end"
      gap="s"
    >
      <Select
        id="items-per-page"
        name="itemsPerPageSelect"
        isRequired={false}
        labelText="Items Per Page"
        labelPosition={LabelPositions.Inline}
        value={perPage.toString()}
        onChange={(e) => onChangePerPage(e)}
      >
        {numbersPerPage.map((pageNum: string) => {
          return <option key={`per-page-${pageNum}`}>{pageNum}</option>;
        })}
      </Select>
      <Select
        id="sort-by"
        name="sortBySelect"
        isRequired={false}
        labelText="Sort By"
        labelPosition={LabelPositions.Inline}
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
    </Fieldset>
  );
};

export default ResultsSorts;
