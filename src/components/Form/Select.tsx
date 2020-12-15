import React from 'react';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'change-case' or its correspond... Remove this comment to see the full error message
import { titleCase } from 'change-case';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '~/src/util/Util' or its corres... Remove this comment to see the full error message
import { isEmpty } from '~/src/util/Util';

type OwnProps = {
    label?: string;
    labelClass?: string;
    id?: string;
    className?: string;
    selectClass?: string;
    options?: any[];
    value?: string | number;
    onChange?: (...args: any[]) => any;
    onBlur?: (...args: any[]) => any;
    ariaLabel?: string;
    disabled?: boolean;
    name?: string;
};

// @ts-expect-error ts-migrate(2456) FIXME: Type alias 'Props' circularly references itself.
type Props = OwnProps & typeof Select.defaultProps;

// @ts-expect-error ts-migrate(7022) FIXME: 'Select' implicitly has type 'any' because it does... Remove this comment to see the full error message
const Select = ({ className, id, labelClass, label, selectClass, value, onChange, onBlur, options, ariaLabel, disabled, name, }: Props) => (
  // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  <div className={className}>
    {label && (
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <label
        htmlFor={id}
        className={labelClass}
      >
        {label}
      </label>
    )}
    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
    <select
      className={selectClass}
      id={id}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      aria-label={ariaLabel}
      disabled={disabled}
      name={name}
    >
      {!isEmpty(options) ? (
        options.map((opt: any, key: any) => (
          // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <option
            key={key.toString()}
            value={opt && opt.value ? opt.value : opt}
          >
            {opt && opt.label ? opt.label : titleCase(opt)}
          </option>
        ))
      ) : (
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
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
  name: '',
};

export default Select;
