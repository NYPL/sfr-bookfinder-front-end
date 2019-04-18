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
        <label className={this.props.textInputlabelClass} htmlFor={this.props.textInputId}>
          {this.props.textInputLabel}
        </label>
        <input
          className={this.props.textInputClass}
          id={this.props.textInputId}
          type={this.props.textInputType}
          name={this.props.textInputName}
          aria-labelledby={this.props.ariaLabel}
          value={this.props.textInputValue}
          placeholder={this.props.placeholder}
          onChange={this.props.onChangeHandler}
        />
      </div>
    );
  }
}

TextInput.propTypes = {
  className: PropTypes.string,
  textInputLabel: PropTypes.string,
  textInputlabelClass: PropTypes.string,
  textInputId: PropTypes.string,
  textInputClass: PropTypes.string,
  textInputType: PropTypes.string,
  textInputName: PropTypes.string,
  textInputValue: PropTypes.string,
  ariaLabel: PropTypes.string,
  placeholder: PropTypes.string,
  onChangeHandler: PropTypes.func,
};

TextInput.defaultProps = {
  textInputLabel: '',
  textInputlabelClass: 'usa-sr-only',
  className: 'nypl-searchbar',
  textInputId: '',
  textInputType: '',
  textInputClass: 'search-field-big',
  textInputName: '',
  textInputValue: '',
  ariaLabel: '',
  placeholder: '',
  onChangeHandler: () => {},
};

export default TextInput;
