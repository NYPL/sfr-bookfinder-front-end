/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';

import { storiesOf } from '@storybook/react';
import { text, array, object } from '@storybook/addon-knobs';
// import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';

// import { Button, Welcome } from '@storybook/react/demo';

import SearchForm from '../src/app/components/SearchForm/SearchForm';
import TextInput from '../src/app/components/Form/TextInput';
import Select from '../src/app/components/Form/Select';
import SearchButton from '../src/app/components/Button/SearchButton';

import '../src/client/styles/main.scss';

import workItem from '../test/fixtures/workitem.json';
import EBookList from '../src/app/components/List/EBookList';

const ebooks = workItem.instances[0].items;
const searchQuery = { query: '', field: 'keyword' };
storiesOf('Storybook', module).add('ResearchNow', () => <div>This is the storybook for the components of ResearchNow</div>);

storiesOf('Search', module)
  .add('SearchForm', () => <SearchForm searchQuery={object('SearchQuery', searchQuery)} />)
  .add('TextInput', () => (
    <TextInput
      ariaLabel="Search for keyword, author, title, or subject"
      labelClass="visuallyhidden usa-label"
      id="search-field-big"
      type="text"
      inputClass="usa-input nypl-search-input"
      name="query"
      value={text('TextInput', 'Search')}
      className="nypl-searchbar-input grid-col-3"
    />
  ))
  .add('Select', () => (
    <Select
      label=""
      ariaLabel="Search"
      labelClass="visuallyhidden usa-label"
      id="search-by-field"
      selectClass="nypl-select-input usa-select"
      className="grid-col-3 nypl-search-input"
      value=""
      name="field"
      options={array('Options', ['keyword', 'title', 'author', 'subject'])}
    />
  ))
  .add('SearchButton', () => (
    <SearchButton
      id="search-button"
      className="grid-col-1"
      buttonClassName="usa-button sfr-search-button"
      value={text('Button', 'Search')}
      ariaLabel="Search"
    />
  ));

storiesOf('Results', module).add('EbooksList', () => (
  <table className="nypl-editions-table">
    <tbody>
      <tr>
        <td>
          <EBookList
            ebooks={object('eBooks', ebooks)}
            eReaderUrl=""
          />
        </td>
      </tr>
    </tbody>
  </table>
));
