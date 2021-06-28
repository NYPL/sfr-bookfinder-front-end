## NYPL ResearchNow

### Version
> 0.10.1

### ResearchNow Search & Retrieval Application
[![GitHub version](https://badge.fury.io/gh/NYPL%2Fsfr-bookfinder-front-end.svg)](https://badge.fury.io/gh/NYPL%2Fsfr-bookfinder-front-end)

Digital Research Books' front end application based on NYPL's React Design System.

Provides a "Welcome page" entry point with heading, search box, and tagline. Connects to an ElasticSearch index via an API endpoint (https://drb-api-production.nypl.org/apidocs/).
Simple  searches can be entered in the form and an index response is displayed back to the user.

### Requirements
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

### Conbributing: Local Development
Clone the repo and run `npm install`.

Create a `.env` file and add the `APP_ENV` and `API_URL`.  See `.env.sample` for an example.  

Run `npm run dev` to start the local server at `localhost:3000` 

### Dependencies
* NextJS
* Redux
* NYPL Header and Footer npm modules
* NYPL Design System

### Usage

Currently takes in a query string to pass along to the ResearchNow Search API which submits a keyword search to the Elasticsearch instance, and renders the returned output. Sends the `query` parameter specified in the rendered search form on the main page.

The server route `/search` should also take a `query` query string parameter and perform the same keyword search via the ResearchNow Search API.

Search via keyword, author, title, subject have been implemented. Terms use the AND boolean operator by default. Search terms can also use the OR boolean operator and search terms can be quoted for phrase searching. Combinations of these can be used as well for more complex searching using the basic search input.

Term combinations
* One term: jefferson
* Multiple terms: world war
* Phrase: "English Literature"
* Single term and phrase: james AND "English Literature"

These types of combinations can be used with any available field selection.

### Test

To run unit tests, run `npm run test` in the terminal. 

