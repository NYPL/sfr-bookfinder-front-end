# CHANGE LOG

## [0.3.1] - 2019-10-03

### Added
- Books available to read online now load in an iFrame, and NYPL branding and navigation are preserved.

### Fixed

- Filter by year searches using defaults when either start or end year is not present
- Item with no links no longer causes unrecoverable error

## [0.3.0] - 2019-08-09

### Added

- Implemented an Advanced Search page that allows for multiple fields to be queried at once, along with filters being applied at the same time
- Advanced search terms/filters are displayed on the search results page
- Implemented a live version of the NYPL header, replacing the previous static image

### Fixed

- Prevented over-specific filter options from being set and leaving users in a situation where they will have to re-start their search from scratch

## [0.2.0] - 2019-07-11

Implements further searching and sorting options within the search results page

### Added

- Updated application page titles
- Added sorting by author and date within the search results
- Updated the editions displayed within the search results, applying the current sort context to the editions displayed

### Fixed

- Improved the screen reader experience/accessibility by ensuring that element focusing was correctly implemented and behaving as expected

## [0.1.1] - 2019-06-27

This minor patch release includes a range of UX/UI improvements and new features for sorting and filtering search results

### Added

- Improved lists of eBook links for reading online and download options
- Implementation of server storage for state management
- Added loading "spinner" with custom graphic
- Enabled sorting by work title
- Enabled filtering by publication date and language

### Fixed

- Corrected display issues in IE11
- Improved the user experience of the site with javascript disabled/not available

## [0.1.0] - 2019-05-17

Initial Release of the ResearchNow application for user testing

### Added

- Basic Search form for keyword, title, author and subject
- Paging of search results
- Detail page for search results
- Basic online reading experience
