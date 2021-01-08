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
  findFiltersExceptField,
  findQueryForField,
  getQueryString,
} from "~/src/util/SearchQueryUtils";
import {
  initialApiSearchQuery,
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
import BookFormatInput from "../BookFormatInput/BookFormatInput";

const AdvancedSearch: React.FC<{
  searchQuery: SearchQuery;
  languages: ApiLanguage[];
}> = (props) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState(
    props.searchQuery ? props.searchQuery : initialSearchQuery
  );

  const submit = () => {
    console.log("query", queryToString(searchQuery));
    router.push({
      pathname: "/search",
      query: queryToString(searchQuery),
    });
    debugger;
  };

  const onQueryChange = (e, queryKey) => {
    const newQuery = {
      field: queryKey,
      query: e.target.value,
    };

    const allQueries = searchQuery.queries.filter((query) => {
      return query.field !== queryKey;
    });

    allQueries.push(newQuery);
    setSearchQuery({
      ...searchQuery,
      queries: allQueries,
    });
  };

  const onLanguageChange = (e, language) => {
    const languageFilters = findFiltersForField(
      searchQuery.filters,
      "language"
    );

    setSearchQuery({
      ...searchQuery,
      filters: [
        ...findFiltersExceptField(searchQuery.filters, "language"),
        ...(e.target.checked
          ? [...languageFilters, { field: "language", value: language }]
          : languageFilters.filter((filter) => {
              return filter.value !== language;
            })),
      ],
    });
  };

  const onBookFormatChange = (e, format) => {
    const formatFilters = findFiltersForField(searchQuery.filters, "format");

    setSearchQuery({
      ...searchQuery,
      filters: [
        ...findFiltersExceptField(searchQuery.filters, "format"),
        ...(e.target.checked
          ? [...formatFilters, { field: "format", value: format }]
          : formatFilters.filter((filter) => {
              return filter.value !== format;
            })),
      ],
    });
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
            submit();
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
                    value={
                      findQueryForField(searchQuery.queries, field.key)
                        ? findQueryForField(searchQuery.queries, field.key)
                            .query
                        : ""
                    }
                    onChange={(e) => onQueryChange(e, field.key)}
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
            onLanguageChange={(e, language) => onLanguageChange(e, language)}
          />
          <div className="grid-row margin-top-4 grid-gap">
            <div className="tablet:grid-col-6">
              <FilterYears dateFilters={searchQuery.filterYears} />
            </div>

            <BookFormatInput
              selectedFormats={findFiltersForField(
                searchQuery.filters,
                "format"
              )}
              onFormatChange={(e, format) => {
                onBookFormatChange(e, format);
              }}
            />
          </div>
          <DS.Button
            id="search-button"
            buttonType={DS.ButtonTypes.Primary}
            type="submit"
          >
            Search
          </DS.Button>
          <DS.Button
            id="clear-button"
            buttonType={DS.ButtonTypes.Secondary}
            type="reset"
          >
            Clear
          </DS.Button>
          <div className="grid-row grid-gap">
            <div className="tablet:grid-col-6">
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
