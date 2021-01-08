/* eslint-env mocha */
import React from "react";
import Filters from "~/src/components/Filters/Filters copy";
import { ApiFilter, Filter } from "~/src/types/SearchQuery";
import { toFilters } from "../apiConversion";
import { expect } from "chai";

const apiFilters: ApiFilter[] = [
  {
    field: "language",
    value: "Spanish",
  },
  {
    field: "years",
    value: {
      start: 1800,
      end: 2000,
    },
  },
];

const convertedFilters: Filter[] = [
  { field: "language", value: "Spanish" },
  { field: "yearStart", value: 1000 },
  { field: "yearEnd", value: 2000 },
];

describe("Filters conversion", () => {
  expect(toFilters(apiFilters)).to.equal(convertedFilters);
});
