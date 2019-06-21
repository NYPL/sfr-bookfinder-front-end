/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';

import { storiesOf } from '@storybook/react';
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

storiesOf('Storybook', module).add('ResearchNow', () => <div>This is the storybook for the components of ResearchNow</div>);

// storiesOf('Button', module)
//   .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
//   .add(
//     'with some emoji',
//     () => (
//       <Button onClick={action('clicked')}>
//         <span
//           role="img"
//           aria-label="so cool"
//         >
//           😀 😎 👍 💯
//         </span>
//       </Button>
//     ),
//     { notes: 'test' },
//   );

storiesOf('Search', module)
  .add('SearchForm', () => <SearchForm />)
  .add('TextInput', () => (
    <TextInput
      ariaLabel="Search for keyword, author, title, or subject"
      labelClass="visuallyhidden usa-label"
      id="search-field-big"
      type="text"
      inputClass="usa-input nypl-search-input"
      name="query"
      value=""
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
      options={['keyword', 'title', 'author', 'subject']}
    />
  ))
  .add('SearchButton', () => (
    <SearchButton
      id="search-button"
      className="grid-col-1"
      buttonClassName="usa-button sfr-search-button"
      value="Search"
      ariaLabel="Search"
    />
  ));

storiesOf('Results', module).add('EbooksList', () => (
  <table className="nypl-editions-table">
    <tbody>
      <tr>
        <td>
          <EBookList
            ebooks={ebooks}
            eReaderUrl=""
          />
        </td>
      </tr>
    </tbody>
  </table>
));
