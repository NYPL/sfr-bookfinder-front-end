import React from 'react';
import PropTypes from 'prop-types';

const TextInput = ({
  className, label, labelClass, id, inputClass, type, name, ariaLabel, value, onChange,
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
      aria-labelledby={label && id}
      aria-label={ariaLabel}
      value={value}
      onChange={onChange}
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
};

export default TextInput;
