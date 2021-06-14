# CHANGE LOG
## [0.10.1]

### Fixed
- Footer hover links colours are fixed

## [0.10.0]

- Refactors app to use NextJS, NYPL Design System, Typescript
- Refactors app to use API v4
- Adds integration tests to landing and search pages
- Adds temporary deployment of feature branches for QA testing
- Refactors app to use `API_URL` and `APP_ENV` environment variables
- Resolve issue with temporary testing environment teardown GHA and API port
- Add favicon

## [0.9.3]

- Updated dgx-global-footer to 0.5.7.
- Adds the new urlType prop to the Footer component set to "absolute"

## [0.9.2]

- Clears searchbar on field change
- Fixed direct linking to reader page
- Removed mobile apology

## [0.9.1]

- Updated dgx-global-footer to 0.5.6.
- Edited some typos and added page title to Edition Detail
- String truncating now occurs on word boundaries
- Add APA Citations under feature flag
- Filters always show all filter options

## [0.9.0]

### Changed

- Filters now hide on mobile and show in sidebar.
- Updated to Design System 0.1.0
- Work Detail page has a Show All toggle
- Edition Detail Page added

## [0.8.5]

### Added

- Google Analytics Events for Read Online and Download links

### Fixed

- Local and development environments HTTP protocals

## [0.8.4]

### Added

- Production deployment step to TravisCI

## [0.8.3]

### Fixed

- iframe scrolling
- VIAF searches no longer visibly show on page.

## [0.8.2]

### Added

- Form to request digitization that writes to an Airtable instance.

### Fixed

- Breadcrumbs reflects work titles
- Empty search redirects to homepage

## [0.8.1] - 2020-02-03

### Added

- https support

### Changed

- Breadcrumb appears on Read-Online page

## [0.8.0] - 2020-01-20

### Changed

- Updated landing page, search results and work detail to new designs
- Added Feedback form
- Moved to API v3

## [0.3.3]

### Added

- Pulls in Design System as a dependency

### Changed

- Breadcrumbs now use Design System Breadcrumbs

## [0.3.2] - 2019-11-06

### Added

- Google Analytics hooks that record user searches
- System Fonts

### Fixed

- Read-online links now use webpub viewer
- simple search now uses the `queries` array rather than a separate `query` array

### Removed

- The Kievit font

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
