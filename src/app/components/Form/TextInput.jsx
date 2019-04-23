import React from 'react';
import PropTypes from 'prop-types';

class TextInput extends React.Component {
  constructor(props) {
    super(props);

    this.props = props;
  }

  render() {
    return (
      <div className={this.props.className}>
        <label
          className={this.props.labelClass}
          htmlFor={this.props.id}
        >
          {this.props.label}
        </label>
        <input
          className={this.props.inputClass}
          id={this.props.id}
          type={this.props.type}
          name={this.props.name}
          aria-labelledby={this.props.ariaLabel}
          value={this.props.value}
          placeholder={this.props.placeholder}
          onChange={this.props.onChange}
        />
      </div>
    );
  }
}

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
  placeholder: PropTypes.string,
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
  placeholder: '',
  onChange: () => {},
};

export default TextInput;
