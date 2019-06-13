import React from 'react';
import PropTypes from 'prop-types';
import { initialSearchQuery, searchQueryPropTypes } from '../../stores/InitialState';

import { yearsType } from '../../constants/labels';

const getYearsFilter = (searchQuery) => {
  const yearsValues = {};
  Object.keys(yearsType).forEach((yearType) => {
    const yearValue = searchQuery && searchQuery.filters && searchQuery.filters.find(filter => filter.field === 'years');
    yearsValues[yearType] = yearValue && yearValue.value[yearType] ? Number(yearValue.value[yearType]) : '';
  });
  return yearsValues;
};

class FilterYears extends React.Component {
  constructor(props) {
    super(props);
    this.state = getYearsFilter(props.searchQuery);
    this.onChangeYear = this.onChangeYear.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(getYearsFilter(nextProps.searchQuery));
  }

  onChangeYear(e, yearType) {
    let val = e.target.value && Number(e.target.value);
    if (yearType === 'start' && this.state.end && val && val > Number(this.state.end)) {
      val = this.state.end;
    }
    if (yearType === 'end' && this.state.start && val && val < Number(this.state.start)) {
      val = this.state.start;
    }
    const obj = {};
    obj[yearType] = val;
    this.setState(state => Object.assign({}, state, obj));
    this.props.onChange({ ...this.state, ...obj });
  }

  render() {
    return (
      <div className="grid-container padding-0">
        <div className="grid-row">
          {Object.keys(yearsType).map(yearType => (
            <label
              key={`filters.years.${yearType}`}
              className="usa-label tablet:grid-col padding-right-4"
              htmlFor={`filters.years.${yearType}`}
            >
              {yearsType[yearType]}
              <input
                className="usa-input"
                id={`filters.years.${yearType}`}
                name={`filters.years.${yearType}`}
                type="number"
                value={this.state[yearType]}
                onChange={e => this.onChangeYear(e, yearType)}
                onBlur={e => this.onChangeYear(e, yearType)}
                max={yearType === 'start' ? this.state.end : null}
                min={yearType === 'end' ? this.state.start : null}
              />
            </label>
          ))}
        </div>
        <div className="grid-row">
          <button
            className="usa-button usa-button--outline padding-x-4"
            type="submit"
          >
            Update
          </button>
        </div>
      </div>
    );
  }
}

FilterYears.propTypes = {
  searchQuery: searchQueryPropTypes,
  onChange: PropTypes.func,
};

FilterYears.defaultProps = {
  searchQuery: initialSearchQuery,
  onChange: () => {},
};

export default FilterYears;
