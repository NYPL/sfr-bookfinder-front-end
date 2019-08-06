import React from 'react';
import PropTypes from 'prop-types';

const TextInput = ({
  className,
  label,
  labelClass,
  id,
  inputClass,
  type,
  name,
  ariaLabel,
  value,
  onChange,
  max,
  min,
  errorMessage,
  onBlur,
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
    {errorMessage && (
      <span
        className="usa-error-message"
        id={`${id}-input-error-message`}
        role="alert"
      >
        {errorMessage}
      </span>
    )}
    <input
      className={inputClass}
      id={id}
      type={type}
      name={name}
      aria-label={ariaLabel}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
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
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ariaLabel: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  max: PropTypes.string,
  min: PropTypes.string,
  errorMessage: PropTypes.string,
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
  onBlur: () => {},
  max: '',
  min: '',
  errorMessage: '',
};

export default TextInput;
