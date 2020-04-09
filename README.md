## NYPL ResearchNow

### Version
> 0.8.6

### ResearchNow Search & Retrieval Application
[![GitHub version](https://badge.fury.io/gh/NYPL%2Fsfr-bookfinder-front-end.svg)](https://badge.fury.io/gh/NYPL%2Fsfr-bookfinder-front-end)
[![Build Status](https://travis-ci.com/NYPL/sfr-bookfinder-front-end.svg?branch=development)](https://travis-ci.com/NYPL/sfr-bookfinder-front-end)
[![Dependencies Status](https://david-dm.org/NYPL/sfr-bookfinder-front-end/status.svg)](https://david-dm.org/NYPL/sfr-bookfinder-front-end)
[![devDependencies Status](https://david-dm.org/NYPL/sfr-bookfinder-front-end/dev-status.svg)](https://david-dm.org/NYPL/sfr-bookfinder-front-end?type=dev)

ResearchNow front end application based on NYPL's React boilerplate code.

Provides a "Welcome page" entry point with heading, search box, and tagline. Connects to an ElasticSearch index via an API endpoint (https://platform.nypl.org/research-now/search-api).
Simple keyword searches can be entered in the form and an index response is displayed back to
the user.

### Querying

### Requirements
- React v15.5.4
- React Router v3.0.5
- Redux v4.0.1

### Installation
Clone the repo and run `npm install`.
ResearchNow also uses [webpub viewer] (https://github.com/NYPL-Simplified/webpub-viewer/tree/SFR-develop) to serve epubs.  Clone this branch and run `npm install` and `npm run streamed`

For local development, run `npm run dev-start` to start the local server at `localhost:3001` with
default environment variables.

Configurations are environment specific with different values per environment so it's necessary
to set the appropriate environment when starting the application.

### Dependencies

* ES6 - compiled with Babel and Webpack
* Redux
* NYPL Header and Footer npm modules
* Webpack

### Usage

Currently takes in a query string to pass along to the ResearchNow Search API which submits a keyword search to the Elasticsearch instance, and renders the returned output. Sends the `q` parameter specified in the rendered search form on the main page.

The server route `/search` should also take a `q` query string parameter and perform the same keyword search via the ResearchNow Search API.

Search via keyword, author, title, subject have been implemented against v1 of the ResearchNow Search API. Terms use the AND boolean operator by default. Search terms can also use the OR boolean operator and search terms can be quoted for phrase searching. Combinations of these can be used as well for more complex searching using the basic search input.

Term combinations
* One term: jefferson
* Multiple terms: world war
* Phrase: "English Literature"
* Single term and phrase: james AND "English Literature"

These types of combinations can be used with any available field selection.

Advanced search to introduce multiple form inputs including field select.

#### Feature Flag Testing
To test Request Digitization, append to the url `feature=RequestDigital`
To test Total Number of Works, append to the url `feature=BooksCount`
Appending to URL doesn't work for more than one feature, to test more than one feature, edit the object in `featureFlagConfig.js`

### Test

To run unit tests, run `npm test` in the terminal. Or run `npm run test-with-coverage` to run the test and see the test coverage.
