import React from 'react';

type OwnProps = {
    className?: string;
    label?: string;
    name?: string;
    labelClass?: string;
    id?: string;
    inputClass?: string;
    isSelected?: boolean;
    onChange?: (...args: any[]) => any;
};

// @ts-expect-error ts-migrate(2456) FIXME: Type alias 'Props' circularly references itself.
type Props = OwnProps & typeof Checkbox.defaultProps;

// @ts-expect-error ts-migrate(7022) FIXME: 'Checkbox' implicitly has type 'any' because it do... Remove this comment to see the full error message
const Checkbox = ({ label, name, isSelected, onChange, className, labelClass, id, inputClass, }: Props) => (
  // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  <div className={className}>
    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
    <input
      id={id}
      type="checkbox"
      name={name}
      checked={isSelected}
      onChange={onChange}
      className={inputClass}
    />
    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
    <label
      className={labelClass}
      htmlFor={id}
    >
      {label}
    </label>
  </div>
);

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
