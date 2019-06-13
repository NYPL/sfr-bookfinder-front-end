import React from 'react';
import PropTypes from 'prop-types';

import { yearsType } from '../../constants/labels';

class FilterYears extends React.Component {
  constructor(props) {
    super(props);
    this.state = { start: '', end: '' };
    this.onChangeYear = this.onChangeYear.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ start: nextProps.startYear, end: nextProps.endYear });
  }

  onChangeYear(e, yearType) {
    const obj = {};
    obj[yearType] = e.target.value;
    this.setState(state => Object.assign({}, state, obj));
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
  startYear: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  endYear: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

FilterYears.defaultProps = {
  startYear: '',
  endYear: '',
};

export default FilterYears;
