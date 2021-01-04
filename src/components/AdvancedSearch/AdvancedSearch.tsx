import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Select from "react-select";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useRouter, withRouter } from "next/router";

import appConfig from "~/config/appConfig";
import Breadcrumbs from "~/src/components/Breadcrumbs/Breadcrumbs";
import {
  findFiltersForField,
  findQueryForField,
  getQueryString,
} from "~/src/util/SearchQueryUtils";
import {
  initialSearchQuery,
  searchQueryPropTypes,
} from "~/src/stores/InitialState";
import TextInput from "~/src/components/Form/TextInput";
import Checkbox from "~/src/components/Form/Checkbox";
import {
  inputTerms,
  formatTypes,
  errorMessagesText,
} from "~/src/constants/labels";
import FilterYears from "~/src/components/SearchResults/FilterYears";
import { searchFields } from "~/src/constants/fields";
import {
  ApiSearchQuery,
  Filter,
  Query,
  SearchQuery,
} from "~/src/types/SearchQuery";
import { queryToString } from "~/src/util/SearchUtils";

import * as DS from "@nypl/design-system-react-components";
import LanguageAccordion from "../LanguageAccordion/LanguageAccordion";
import { ApiLanguage } from "~/src/types/LanguagesQuery";

export const initialState = {
  error: false,
  errorMsg: "",
  languages: [],
  queries: {
    keyword: "",
    title: "",
    author: "",
    subject: "",
    viaf: "",
  },
  filters: {
    format: {
      epub: false,
      pdf: false,
      html: false,
    },
    language: [],
    years: {
      start: "",
      end: "",
    },
  },
  showQueries: {
    keyword: "",
    title: "",
    author: "",
    subject: "",
  },
};
// style for the languages dropdown
const customStyles = {
  control: (base: any) => ({
    ...base,
    minHeight: "2.5rem",
  }),
  menu: (base: any) => ({
    ...base,
    background: "#FFF",

    // override border radius to match the box
    borderRadius: 0,

    border: "1px solid black",
    width: "100%",

    // kill the gap
    marginTop: 0,

    marginRigth: "2rem",
  }),
  menuList: (base: any) => ({
    ...base,

    // kill the white space on first and last option
    padding: 0,
  }),
  option: (base: any, state: any) => ({
    ...base,
    background: state.isFocused ? "black" : "white",
    color: state.isFocused ? "white" : "black",
  }),
};

const AdvancedSearch: React.FC<{
  searchQuery: ApiSearchQuery;
  languages: ApiLanguage[];
}> = (props) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState(
    props.searchQuery ? props.searchQuery : initialSearchQuery
  );

  const submit = async (query: SearchQuery) => {
    const path = `/search?${queryToString(query)}`;
    router.push(path);
  };

  const onLanguageChange = (selectedLanguages: Filter[]) => {
    setSearchQuery({
      ...searchQuery,
      filters: [
        ...searchQuery.filters.filter((fil) => fil.field !== "language"),
        ...selectedLanguages,
      ],
    });
    console.log("language changed");
  };

  return (
    <main id="mainContent" className="main">
      <div className="content-header">
        <Breadcrumbs />
      </div>

      <div aria-label="Digital Research Books Beta" className="grid-col-12">
        <div className="sfr-header-wrapper grid-col-10">
          <h1 className="nypl-heading">Digital Research Books Beta</h1>

          <div id="tagline">
            Search the world&apos;s research collections and more for digital
            books you can use right now
          </div>
        </div>

        <form
          className="usa-form grid-container width-full margin-x-0 padding-x-0"
          onSubmit={() => {
            console.log("submitting");
          }}
          onKeyPress={(event) => {
            if (event.keyCode === 13) {
              // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
              this.submitSearchRequest();
            }
          }}
        >
          <fieldset>
            <legend>Advanced Search</legend>

            {inputTerms.map((field: { key: string; label: string }) => {
              return (
                <div key={`field-${field.key}`}>
                  <DS.Label
                    htmlFor={`${field.key}-input`}
                    id={`${field.key}-label`}
                  >
                    {field.label}
                  </DS.Label>
                  <DS.Input
                    id={`${field.key}-input`}
                    ariaLabel={`Input for ${field.label}`}
                    defaultValue={
                      props.searchQuery
                        ? findQueryForField(
                            props.searchQuery.queries,
                            field.key
                          )
                        : ""
                    }
                  />
                </div>
              );
            })}
          </fieldset>

          <LanguageAccordion
            languages={props.languages.map((lang) => lang.language)}
            selectedLanguages={findFiltersForField(
              searchQuery.filters,
              "language"
            )}
            onLanguageChange={(selectedLanguages: Filter[]) =>
              onLanguageChange(selectedLanguages)
            }
          />

          <div className="grid-row margin-top-4 grid-gap">
            <div className="tablet:grid-col-6">
                  <fieldset className="usa-fieldset grid-container width-full margin-x-0 padding-x-0 margin-bottom-2">
                    <legend className="usa-legend font-sans-lg sub-legend">
                      Publication Year
                    </legend>

                    <FilterYears
                      years={findFiltersForField(searchQuery.filters, "years") ? findFiltersForField(searchQuery.filters, "years")}
                    />
                  </fieldset>
                </div>

            {/* <div className="tablet:grid-col-6">
                  <fieldset className="usa-fieldset grid-container width-full margin-x-0 padding-x-0">
                    <legend className="usa-legend font-sans-lg sub-legend margin-bottom-3">
                      Format
                    </legend>

                    {formatTypes.map((formatType: any) => (
                      <Checkbox
                        className="usa-checkbox tablet:grid-col-12"
                        labelClass="usa-checkbox__label"
                        inputClass="usa-checkbox__input"
                        id={`filters-format-${formatType.value}`}
                        isSelected={getFilterValue("format", formatType.value)}
                        onChange={this.onFormatChange}
                        label={formatType.label}
                        name={formatType.value}
                        key={`facet-format-${formatType.value}`}
                      />
                    ))}
                  </fieldset>
                </div> */}
          </div>

          <div className="grid-row grid-gap">
            <div className="tablet:grid-col-6">
              <div className="grid-row grid-gap">
                <div className="tablet:grid-col-6">
                  <input
                    className="usa-button width-full margin-top-1"
                    type="submit"
                    value="Search"
                    readOnly
                    // onClick={submitSearchRequest}
                  />
                </div>

                <div className="tablet:grid-col-6">
                  <input
                    className="usa-button usa-button--outline width-full margin-top-1"
                    type="clear"
                    value="Clear"
                    // onClick={clearForm}
                    readOnly
                  />
                </div>
              </div>
              {/* {this.state.error && (
                    <div className="usa-alert usa-alert--error" role="alert">
                      <div className="usa-alert__body">
                        <h3 className="usa-alert__heading">Error</h3>

                        <p className="usa-alert__text">{this.state.errorMsg}</p>
                      </div>
                    </div>
                  )} */}
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default AdvancedSearch;
