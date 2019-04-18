import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../Form/TextInput';
import SearchButton from '../Button/SearchButton';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.props = props;
  }

  render() {
    return (
      <div className={this.props.className}>
        <TextInput
          label={this.props.inputLabel}
          labelClass={this.props.inputLabelClass}
          class={this.props.inputClass}
          id={this.props.inputId}
          type={this.props.inputType}
          name={this.props.inputName}
          ariaLabel={this.props.ariaLabel}
          value={this.props.inputValue}
          placeholder={this.props.placeholder}
          onChange={this.props.onChangeHandler}
        />
        <SearchButton
          id={this.props.buttonId}
          class={this.props.buttonClass}
          value={this.props.buttonValue}
          onClick={this.props.onClickHandler}
        />
      </div>
    );
  }
}

SearchBar.propTypes = {
  inputLabel: PropTypes.string,
  inputLabelClass: PropTypes.string,
  inputId: PropTypes.string,
  className: PropTypes.string,
  inputClass: PropTypes.string,
  inputType: PropTypes.string,
  inputName: PropTypes.string,
  inputValue: PropTypes.string,
  ariaLabel: PropTypes.string,
  placeholder: PropTypes.string,
  onChangeHandler: PropTypes.func,
  buttonId: PropTypes.string,
  buttonClass: PropTypes.string,
  buttonValue: PropTypes.string,
  onClickHandler: PropTypes.func,
};

SearchBar.defaultProps = {
  inputLabel: '',
  inputLabelClass: 'usa-sr-only',
  inputId: 'searchbar',
  className: 'nypl-search-bar',
  inputClass: 'usa-width-one-third',
  inputType: '',
  inputName: '',
  inputValue: '',
  ariaLabel: '',
  placeholder: '',
  onChangeHandler: () => {},
  buttonId: '',
  buttonClass: 'usa-width-one-third',
  buttonValue: 'Search',
  onClickHandler: () => {},
};

export default SearchBar;
