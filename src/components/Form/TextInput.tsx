import React from 'react';

type OwnProps = {
    className?: string;
    label?: string;
    labelClass?: string;
    id?: string;
    inputClass?: string;
    type?: string;
    name?: string;
    value?: string | number;
    ariaLabel?: string;
    onChange?: (...args: any[]) => any;
    onBlur?: (...args: any[]) => any;
    max?: string;
    min?: string;
    errorMessage?: string;
};

// @ts-expect-error ts-migrate(2456) FIXME: Type alias 'Props' circularly references itself.
type Props = OwnProps & typeof TextInput.defaultProps;

// @ts-expect-error ts-migrate(7022) FIXME: 'TextInput' implicitly has type 'any' because it d... Remove this comment to see the full error message
const TextInput = ({ className, label, labelClass, id, inputClass, type, name, ariaLabel, value, onChange, max, min, errorMessage, onBlur, }: Props) => (
  // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  <div className={className}>
    {label && (
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <label
        className={labelClass}
        htmlFor={id}
      >
        {label}
      </label>
    )}
    {errorMessage && (
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <span
        className="usa-error-message"
        id={`${id}-input-error-message`}
        role="alert"
      >
        {errorMessage}
      </span>
    )}
    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
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
