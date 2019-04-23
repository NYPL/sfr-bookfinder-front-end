import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty as _isEmpty } from 'underscore';
import { titleCase } from 'change-case';

class Select extends React.Component {
  constructor(props) {
    super(props);

    this.props = props;
  }

  render() {
    return (
      // Place some standard HTML here.
      <div className="grid-col-4 nypl-search-input">
        <label
          htmlFor={this.props.id}
          className={this.props.labelClass}
        >
          {this.props.label}
        </label>
        <select
          className={this.props.class}
          name="options"
          id={this.props.id}
          value={this.props.value}
          onChange={this.props.onChange}
          onBlur={this.props.onBlur}
        >
          {!_isEmpty(this.props.options) ? (
            this.props.options.map((opt, key) => (
              <option
                key={key.toString()}
                value={opt}
              >
                {titleCase(opt)}
              </option>
            ))
          ) : (
            <option
              key="default"
              value=""
            >
              -- Select --
            </option>
          )}
        </select>
      </div>
    );
  }
}

Select.propTypes = {
  label: PropTypes.string,
  labelClass: PropTypes.string,
  id: PropTypes.string,
  class: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.any),
  value: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
};

Select.defaultProps = {
  label: 'Choice List',
  labelClass: '',
  id: 'nypl-select-field',
  class: '',
  options: [],
  value: '',
  onChange: () => {},
  onBlur: () => {},
};

export default Select;
