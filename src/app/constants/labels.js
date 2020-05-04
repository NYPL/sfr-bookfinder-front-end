export const workDetailDefinitionLabels = {
  alt_titles: 'Alternative Titles',
  summary: 'Summary',
  series: 'Series',
  agents: 'Author',
  subjects: 'Subject',
  language: 'Language',
};

export const editionDetailDefinitionLabels = {
  title: 'Title',
  publication_date: 'Publication Date',
  publication_place: 'Publication Place',
  agents: 'Publisher(s)',
  edition_statement: 'Edition Statement',
  language: 'Language',
  table_of_contents: 'Table of Contents',
  extent: 'Extent',
  volume: 'Volume',
  summary: 'Summary',
};

export const allWorkLabels = {
  title: 'Title',
  sub_title: 'Subtitle',
  alt_titles: 'Alternative Titles',
  medium: 'Medium',
  series: 'Series',
  summary: 'Summary',
  agents: 'Agents',
  subjects: 'Subject',
  dates: 'Year of Publication',
  identifiers: 'Identifiers',
  links: 'Links',
  measurements: 'Measurements',
};

export const documentTitles = {
  home: 'Digital Research Books Beta | NYPL',
  search: 'Search Results | Digital Research Books Beta | NYPL',
  workItem: 'Item Details | Digital Research Books Beta Now | NYPL',
};

export const yearsType = { start: 'Start', end: 'End' };
export const filtersLabels = {
  show_all: 'Available to read now',
  language: 'Language',
  format: 'Format',
  years: 'Publication Year',
};
// input type advanced searchs
export const inputTerms = [
  { key: 1, values: [{ key: 'keyword', label: 'Keyword' }, { key: 'author', label: 'Author' }] },
  { key: 2, values: [{ key: 'title', label: 'Title' }, { key: 'subject', label: 'Subject' }] },
];


export const formatTypes = [{ value: 'pdf', label: 'PDF' }, { value: 'epub', label: 'ePub' }, { value: 'html', label: 'Html' }];

export const errorMessagesText = {
  emptySearch: 'Please enter a search term',
  invalidDate: 'Start date must be before End date',
};
