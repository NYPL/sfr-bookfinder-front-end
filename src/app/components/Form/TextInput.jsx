import React from 'react';
import PropTypes from 'prop-types';

const TextInput = ({
  className, label, labelClass, id, inputClass, type, name, ariaLabel, value, onChange, max, min,
}) => (
  <div className={className}>
    {label && (
      <label
        className={labelClass}
        htmlFor={id}
      >
        {label}
      </label>
    )}
    <input
      className={inputClass}
      id={id}
      type={type}
      name={name}
      aria-label={ariaLabel}
      value={value}
      onChange={onChange}
      max={max}
      min={min}
    />
  </div>
);

TextInput.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  labelClass: PropTypes.string,
  id: PropTypes.string,
  inputClass: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  ariaLabel: PropTypes.string,
  onChange: PropTypes.func,
  max: PropTypes.string,
  min: PropTypes.string,
};

TextInput.defaultProps = {
  label: '',
  labelClass: '',
  className: '',
  id: '',
  type: '',
  inputClass: 'search-field-big',
  name: '',
  value: '',
  ariaLabel: '',
  onChange: () => {},
  max: '',
  min: '',
};

export default TextInput;
