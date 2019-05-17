// Adapted from https://github.com/fraserxu/react-dropdown

import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const DEFAULT_PLACEHOLDER_STRING = 'Select...';
const parseValue = (value, options) => {
  let option;

  if (typeof value === 'string') {
    for (let i = 0, num = options.length; i < num; i += 1) {
      if (options[i].type === 'group') {
        const match = options[i].items.filter(item => item.value === value);
        if (match.length) {
          option = match[0];
        }
      } else if (typeof options[i].value !== 'undefined' && options[i].value === value) {
        option = options[i];
      }
    }
  }

  return option || value;
};

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: parseValue(props.value, props.options) || {
        label: typeof props.placeholder === 'undefined' ? DEFAULT_PLACEHOLDER_STRING : props.placeholder,
        value: '',
      },
      isOpen: false,
    };
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
    this.fireChangeEvent = this.fireChangeEvent.bind(this);
  }

  componentDidMount() {
    this.mounted = true;
    global.window.document.addEventListener('click', this.handleDocumentClick, false);
    global.window.document.addEventListener('touchend', this.handleDocumentClick, false);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.value) {
      const selected = this.parseValue(newProps.value, newProps.options);
      if (selected !== this.state.selected) {
        this.setState({ selected });
      }
    } else {
      this.setState({
        selected: {
          label: typeof newProps.placeholder === 'undefined' ? DEFAULT_PLACEHOLDER_STRING : newProps.placeholder,
          value: '',
        },
      });
    }
  }

  componentWillUnmount() {
    this.mounted = false;
    global.window.document.removeEventListener('click', this.handleDocumentClick, false);
    global.window.document.removeEventListener('touchend', this.handleDocumentClick, false);
  }

  setValue(value, label) {
    const newState = {
      selected: {
        value,
        label,
      },
      isOpen: false,
    };
    this.fireChangeEvent(newState);
    this.setState(newState);
  }

  handleMouseDown(event) {
    if (this.props.onFocus && typeof this.props.onFocus === 'function') {
      this.props.onFocus(this.state.isOpen);
    }
    if (event.type === 'mousedown' && event.button !== 0) return;
    event.stopPropagation();
    event.preventDefault();

    if (!this.props.disabled) {
      this.setState(prevState => ({
        isOpen: !prevState.isOpen,
      }));
    }
  }

  fireChangeEvent(newState) {
    if (newState.selected !== this.state.selected && this.props.onChange) {
      this.props.onChange(newState.selected);
    }
  }

  isValueSelected() {
    return typeof this.state.selected === 'string' || this.state.selected.value !== '';
  }

  buildMenu() {
    const { options, baseClassName } = this.props;
    const ops = options.map((option) => {
      if (option.type === 'group') {
        const groupTitle = <div className={`${baseClassName}-title`}>{option.name}</div>;
        const menuOptions = option.items.map(item => this.renderOption(item));

        return (
          <div
            className={`${baseClassName}-group`}
            key={option.name}
            role="listbox"
            tabIndex="-1"
          >
            {groupTitle}
            {menuOptions}
          </div>
        );
      }
      return this.renderOption(option);
    });

    return ops.length ? ops : <div className={`${baseClassName}-noresults`}>No options found</div>;
  }

  handleDocumentClick(event) {
    if (this.mounted) {
      if (!this.node.contains(event.target)) {
        if (this.state.isOpen) {
          this.setState({ isOpen: false });
        }
      }
    }
  }

  renderOption(option) {
    let value = option.value;
    if (typeof value === 'undefined') {
      value = option.label || option;
    }
    const label = option.label || option.value || option;
    const isSelected = value === this.state.selected.value || value === this.state.selected;

    const classes = {
      [`${this.props.baseClassName}-option`]: true,
      [option.className]: !!option.className,
      'is-selected': isSelected,
    };

    const optionClass = classNames(classes);

    return (
      <div
        key={value}
        className={optionClass}
        onMouseDown={this.setValue.bind(this, value, label)}
        onClick={this.setValue.bind(this, value, label)}
        onKeyPress={this.setValue.bind(this, value, label)}
        role="option"
        aria-selected={isSelected ? 'true' : 'false'}
        tabIndex={0}
      >
        {label}
      </div>
    );
  }

  render() {
    const {
      baseClassName,
      controlClassName,
      placeholderClassName,
      menuClassName,
      arrowClassName,
      arrowClosed,
      arrowOpen,
      className,
    } = this.props;

    const disabledClass = this.props.disabled ? 'Dropdown-disabled' : '';
    const placeHolderValue = typeof this.state.selected === 'string' ? this.state.selected : this.state.selected.label;

    const dropdownClass = classNames({
      [`${baseClassName}-root`]: true,
      [className]: !!className,
      'is-open': this.state.isOpen,
    });
    const controlClass = classNames({
      [`${baseClassName}-control`]: true,
      [controlClassName]: !!controlClassName,
      [disabledClass]: !!disabledClass,
    });
    const placeholderClass = classNames({
      [`${baseClassName}-placeholder`]: true,
      [placeholderClassName]: !!placeholderClassName,
      'is-selected': this.isValueSelected(),
    });
    const menuClass = classNames({
      [`${baseClassName}-menu`]: true,
      [menuClassName]: !!menuClassName,
    });
    const arrowClass = classNames({
      [`${baseClassName}-arrow`]: true,
      [arrowClassName]: !!arrowClassName,
    });

    const value = <div className={placeholderClass}>{placeHolderValue}</div>;
    const menu = this.state.isOpen ? (
      <div
        className={menuClass}
        aria-expanded="true"
      >
        {this.buildMenu()}
      </div>
    ) : null;

    const showArrowClass = () => {
      if (arrowOpen && arrowClosed) {
        if (this.state.isOpen) {
          return arrowOpen;
        }
        return arrowClosed;
      }
      return <span className={arrowClass} />;
    };
    return (
      <div
        className={dropdownClass}
        ref={(node) => {
          this.node = node;
        }}
      >
        <div
          className={controlClass}
          onMouseDown={this.handleMouseDown.bind(this)}
          onTouchEnd={this.handleMouseDown.bind(this)}
          aria-haspopup="listbox"
          role="option"
          tabIndex={0}
          aria-selected="true"
        >
          {value}
          <div className={`${baseClassName}-arrow-wrapper`}>{showArrowClass()}</div>
        </div>
        {menu}
      </div>
    );
  }
}

Dropdown.propTypes = {
  baseClassName: PropTypes.string,
  controlClassName: PropTypes.string,
  placeholderClassName: PropTypes.string,
  menuClassName: PropTypes.string,
  arrowClassName: PropTypes.string,
  arrowClosed: PropTypes.string,
  arrowOpen: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.any),
  placeholder: PropTypes.string,
  onFocus: PropTypes.func,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};
Dropdown.defaultProps = {
  baseClassName: '',
  controlClassName: '',
  placeholderClassName: '',
  menuClassName: '',
  arrowClassName: '',
  arrowClosed: '',
  arrowOpen: '',
  className: '',
  value: '',
  options: [],
  placeholder: '',
  onFocus: () => {},
  disabled: false,
  onChange: () => {},
};

Dropdown.defaultProps = { baseClassName: 'Dropdown' };
export default Dropdown;
