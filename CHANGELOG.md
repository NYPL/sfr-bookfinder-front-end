# CHANGE LOG

## [Pre-release]

- Add id as subsection for "Read Online" CTA analytics tracking
- Add: SFR-1743: Verify advance search filters for DRB
- Add: SFR-1746: Verify "read online only" toggle button on item details page
- Add: SFR-1748: Verify the headers and footers of Advanced Search page
- Add: SFR-1749: Verfiy the footers and the respecting landing pages (homepage)
- Add: SFR-1750: Verify the Back to Search Results button is available on Item Details page
- SFR-1745: Add Playwright tests to GitHub Actions

## [0.17.3]

- Upgrade to Next 13.4.7
- Add: SFR-1729: Verify the e-reader settings features for DRB
- Replace the Feedback component with DS FeedbackBox component
- Remove Redux for feedback component

## [0.17.2]

- Update to Web Reader version 4.3.1
- Add TOC for single resource PDFs
- Refactored Playwright/Cucumber tests to use new dropdown action function
- Refactored Playwright/Cucumber tests to use new text fill function
- Hide Header and Footer components on /read pages using the Web Reader
- Migrate from Google Analytics to Adobe Analytics
- Refactored Playwright/Cucumber tests to use new visibility function

## [0.17.1]

- Replace dgx-header-component and DS Footer with Header/Footer components from nypl-header-app
- Refactored Playwright/Cucumber tests to use new click action function

## [0.17.0]

- Replace Search Examples with Recently Added Collections to landing page
- Add primary hero to the landing page
- Add Part of Collection to Edition/Work pages
- Add Collection page
- Add collection placeholder image
- Update hero image to update based on screen size
- Chore: fresh package-lock.json install and fix install errors on mac with M1 chip
- Add Playwright/Cucumber tests to support new Recently Added Collections feature on landing page
- Refactored Playwright/Cucumber tests to use new page visit actions function

## [0.16.1]

- add features and tests for government docs filter
- Add github actions to automate tag and release
- Replace DS Header component with dgx-header-component v2.8.0-r16-rc-2

## [0.15.1]

- Fix absolute link is prefixed by host issue

## [0.15.0]

- add features and tests for advanced search
- add features and tests for item details pages
- add features and tests for EDD requests
- add features and tests for item details pages
- add features and tests for link targets
- add features and tests for home page elements
- add features and tests for keyword search
- add features and tests for author search
- add features and tests for title search
- add features and tests for subjects search
- Add government doc filter for search results and advanced search
- Add "Clear Filters" button for search
- Upgrade to NYPL Design System version 1.1.2
- Upgrade to React 17.0.2
- Upgrade to Next 12.2.5
- Fix undefined-heading id on details list heading bug
- Add instrumentation for New Relic
- Selected language filters are displayed until removed/cleared

## [0.14.1]

- Adds Cucumber & Playwright test setup
- Fix QA deploy
- Fix back to search results bug

## [0.14.0]

- Upgrade to NYPL Design System version 1.0.0
- Decouples search query into separate states for each individual form field
- Updates unit tests and snapshots
- CHORE: removes tugboat deploy
- Change format filters to "Readable", "Downloadable", and "Requestable"
- Upgrade to Web Reader version 3.1.0
- Adds author and work title to edition detail page
- Adds feature flag functionality

## [0.13.1]

- Added "Back to search results" link for works and editions

## [0.13.0]

- upgraded webreader to V1
- Fixed back button on webreader when user follows link from external site
- Handle error when there is only catalog link for a work item

## [0.12.0]

- Upgraded to use Node 16
- Removed Enzyme
- Removed Reader V1
- Upgraded webreader to 0.3.3

## [0.11.3]

- Added Back button link

## [0.11.2]

- Defaults build to use reader version V2
- Adds Featured Item and Featured Edition parameters to the edition and work detail page

## [0.11.1]

### Changed

- Adds web-reader and introduces an env variable to switch between `webpub-viewer` and `web-reader`

## [0.11.0]

### Added

- Added EDD button to the edition page and work page
- Add media type checking with `flags`
- Added strict nodejs and npm version for development

## [0.10.4]

### Changed

- Clicking "Advanced Search" starts a new search

## [0.10.3-HOTFIX]

- Adds sidebar class to main when on search results page
- re-adds advanced-search class to Advanced Search

## [0.10.3-HOTFIX]

- Adds sidebar class to main when on search results page
- re-adds advanced-search class to Advanced Search

## [0.10.3]

### Fixed

- Added lang="en" to html
- Moved `main` tag to `Layout` and ensured that they all had the `main-content` id to work with the NYPL header
- Adds an "alert" role to search results so the screen reader reads that it loads in.
- Changes link color to have adequate contrast on gray background

## [0.10.2-HOTFIX]

- Makes searchQuery check more robust

## [0.10.2]

### Added

- Clicking an author name now searches by viaf if the viaf is available.

### [0.10.1-HOTFIX]

- Removes languages from Advanced Search if no language response is recieved

## [0.10.1]

### Fixed

- NYPL footer link hover now shows correct color
- Fixed favicon
- Fixed page title for search result and read online

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
