import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty as _isEmpty } from 'underscore';
import { titleCase } from 'change-case';

const Select = ({
  className, id, labelClass, label, selectClass, value, onChange, onBlur, options,
}) => (
  <div className={className}>
    <label
      htmlFor={id}
      className={labelClass}
    >
      {label}
    </label>
    <select
      className={selectClass}
      name="options"
      id={id}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
    >
      {!_isEmpty(options) ? (
        options.map((opt, key) => (
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

Select.propTypes = {
  label: PropTypes.string,
  labelClass: PropTypes.string,
  id: PropTypes.string,
  className: PropTypes.string,
  selectClass: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.any),
  value: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
};

Select.defaultProps = {
  label: 'Choice List',
  labelClass: '',
  id: 'nypl-select-field',
  className: '',
  selectClass: '',
  options: [],
  value: '',
  onChange: () => {},
  onBlur: () => {},
};

export default Select;
