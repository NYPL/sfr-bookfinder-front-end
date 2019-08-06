import React from 'react';
import PropTypes from 'prop-types';
import { initialSearchQuery, searchQueryPropTypes } from '../../stores/InitialState';
import TextInput from '../Form/TextInput';

import { yearsType, errorMessagesText } from '../../constants/labels';

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
    this.state = { ...getYearsFilter(props.searchQuery), ...{ errorMessage: {}, error: {} } };
    this.onChangeYear = this.onChangeYear.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(prevState => ({ ...getYearsFilter(nextProps.searchQuery), ...prevState }));
  }

  onChangeYear(e, yearType) {
    const val = e.target.value && Number(e.target.value);
    // TODO: errors control UI
    const errorMessage = {};
    const error = {};
    const errorMessageText = errorMessagesText.invalidDate;
    if (yearType === 'start') {
      if (this.state.end && val && val > Number(this.state.end)) {
        errorMessage[yearType] = errorMessageText;
        error[yearType] = true;
      } else {
        errorMessage[yearType] = '';
        error[yearType] = false;
      }
    } else if (yearType === 'end') {
      if (this.state.start && val && val < Number(this.state.start)) {
        errorMessage[yearType] = errorMessageText;
        error[yearType] = true;
      } else {
        errorMessage[yearType] = '';
        error[yearType] = false;
      }
    }
    this.setState({ errorMessage, error });
    const obj = {};
    obj[yearType] = val;
    this.setState(state => Object.assign({}, state, obj));
    if (!error.end && !error.start) {
      this.props.onChange({ ...{ start: this.state.start, end: this.state.end }, ...obj });
      this.props.onError({ errorMsg: '', error: false });
    } else {
      this.props.onError({ errorMsg: errorMessageText, error: true });
    }
  }

  render() {
    return (
      <div className="grid-container padding-0">
        <div className={this.props.className}>
          {Object.keys(yearsType).map(yearType => (
            <TextInput
              className={this.props.inputClassName}
              ariaLabel="Search for End Date"
              labelClass=""
              id={`filters.years.${yearType}`}
              key={`filters.years.${yearType}`}
              type="number"
              inputClass={this.state.error[yearType] ? 'usa-input usa-input--error' : 'usa-input'}
              name={`filters.years.${yearType}`}
              onChange={e => this.onChangeYear(e, yearType)}
              onBlur={e => this.onChangeYear(e, yearType)}
              label={yearsType[yearType]}
              value={this.state[yearType]}
              // errorMessage={this.state.errorMessage[yearType]}
              // max={yearType === 'start' ? this.state.end : null}
              // min={yearType === 'end' ? this.state.start : null}
            />
          ))}
        </div>
        {this.props.showError && (this.state.error.start || this.state.error.end) && (
          <div
            className="usa-alert usa-alert--error"
            role="alert"
          >
            <div className="usa-alert__body">
              <h3 className="usa-alert__heading">Error</h3>
              <p className="usa-alert__text">{this.state.errorMessage.start || this.state.errorMessage.end}</p>
            </div>
          </div>
        )}
      </div>
    );
  }
}

FilterYears.propTypes = {
  searchQuery: searchQueryPropTypes,
  onChange: PropTypes.func,
  onError: PropTypes.func,
  inputClassName: PropTypes.string,
  className: PropTypes.string,
  showError: PropTypes.bool,
};

FilterYears.defaultProps = {
  searchQuery: initialSearchQuery,
  onChange: () => {},
  onError: () => {},
  inputClassName: 'tablet:grid-col padding-right-0 padding-top-2',
  className: 'grid-row grid-gap',
  showError: true,
};

export default FilterYears;
