import React from 'react';
import Store from '../../stores/Store';

class SearchForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = Store.getState();

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    console.log(event);
  }

  handleSubmit(event) {
    console.log(event);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleOnSubmit}>
          <div className="sfr-search-form">
            <fieldset className="nypl-omnisearch">
              <span className="nypl-omni-fields">
                <label htmlFor="search-by-field">Search in</label>
                <select id="search-by-field">
                  <option value="q" defaultValue>Keyword</option>
                  <option value="filters[title]">Title</option>
                  <option value="filters[author]">Author</option>
                </select>
              </span>
              <input
                type="text"
                aria-labelledby="nypl-omni-button"
                value={this.state.value}
                placeholder="Keyword, title, or author"
                onChange={this.handleChange}
              />
              <input
                type="submit"
                id="nypl-omni-button"
                value="Search"
              />
            </fieldset>
          </div>
        </form>
      </div>
    )
  }
}

export default SearchForm;
