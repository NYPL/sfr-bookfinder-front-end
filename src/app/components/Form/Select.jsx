import React from 'react';
import PropTypes from 'prop-types';
import { titleCase } from 'change-case';
import { isEmpty } from '../../util/Util';

const Select = ({
  className, id, labelClass, label, selectClass, value, onChange, onBlur, options, ariaLabel, disabled,
}) => (
  <div className={className}>
    {label && (
      <label
        htmlFor={id}
        className={labelClass}
      >
        {label}
      </label>
    )}
    <select
      className={selectClass}
      id={id}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      aria-label={ariaLabel}
      disabled={disabled}
    >
      {!isEmpty(options) ? (
        options.map((opt, key) => (
          <option
            key={key.toString()}
            value={opt && opt.value ? opt.value : opt}
          >
            {opt && opt.label ? opt.label : titleCase(opt)}
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
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  ariaLabel: PropTypes.string,
  disabled: PropTypes.bool,
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
  ariaLabel: '',
  disabled: false,
};

export default Select;
