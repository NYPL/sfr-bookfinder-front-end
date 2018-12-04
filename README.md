## NYPL ResearchNow

### Version
> 0.1.0

### ResearchNow Search & Retrieval Application
[![GitHub version](https://badge.fury.io/gh/NYPL%2Fsfr-bookfinder-front-end.svg)](https://badge.fury.io/gh/NYPL%2Fsfr-bookfinder-front-end)
[![Build Status](https://travis-ci.org/NYPL/sfr-bookfinder-front-end.svg?branch=development)](https://travis-ci.org/NYPL/sfr-bookfinder-front-end)
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

Then run `npm start` to start the local server at `localhost:3001`.

### Dependencies

* ES6 - compiled with Babel and Webpack
* Redux
* NYPL Header and Footer npm modules
* Webpack

### Usage

Currently takes in a query string to pass along to the ResearchNow Search API which submits a keyword search to the Elasticsearch instance, and renders the returned output. Sends the `q` parameter specified in the rendered search form on the main page.

The server route `/search` should also take a `q` query string parameter and perform the same keyword search via the ResearchNow Search API.

Future functionality will take a title and author field for more preceise searching.

### Test

To run unit tests, run `npm test` in the terminal. Or run `npm run test-with-coverage` to run the test and see the test coverage.
