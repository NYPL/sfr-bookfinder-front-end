import React from 'react';
import PropTypes from 'prop-types';

const Checkbox = ({
  label, name, isSelected, onChange, className, labelClass, id, inputClass,
}) => (
  <div className={className}>
    <input
      id={id}
      type="checkbox"
      name={name}
      checked={isSelected}
      onChange={onChange}
      className={inputClass}
    />
    <label
      className={labelClass}
      htmlFor={id}
    >
      {label}
    </label>
  </div>
);

Checkbox.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  labelClass: PropTypes.string,
  id: PropTypes.string,
  inputClass: PropTypes.string,
  isSelected: PropTypes.bool,
  onChange: PropTypes.func,
};

Checkbox.defaultProps = {
  label: '',
  name: '',
  labelClass: '',
  className: '',
  id: '',
  inputClass: '',
  isSelected: false,
  onChange: () => {},
};

export default Checkbox;
