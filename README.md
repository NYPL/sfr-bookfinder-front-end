## NYPL ResearchNow

### Version
> 0.10.2

### ResearchNow Search & Retrieval Application
[![GitHub version](https://badge.fury.io/gh/NYPL%2Fsfr-bookfinder-front-end.svg)](https://badge.fury.io/gh/NYPL%2Fsfr-bookfinder-front-end)

Digital Research Books' front end application based on NYPL's React Design System.

Provides a "Welcome page" entry point with heading, search box, and tagline. Connects to an ElasticSearch index via an API endpoint (https://digital-research-books-api.nypl.org).
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

### Searcbar
Currently takes in a query string to pass along to the ResearchNow Search API which submits a keyword search to the Elasticsearch instance, and renders the returned output. Sends the `query` parameter specified in the rendered search form on the main page.

Search via keyword, author, title, subject have been implemented. Terms use the AND boolean operator by default. Search terms can also use the OR boolean operator and search terms can be quoted for phrase searching. Combinations of these can be used as well for more complex searching using the basic search input.

Term combinations
* One term: jefferson
* Multiple terms: world war
* Phrase: "English Literature"
* Single term and phrase: james AND "English Literature"

These types of combinations can be used with any available field selection.

### Filtering
Search Results can be filtered by year range, language and available format. 

### Advanced Search
Advanced Search works like the Simple Search, but allows searching for multiple fields and for pre-filtering.  Terms use the AND boolean operator
Term combinations

* Example: Subject:"English Literature" AND Keyword:"Witches"

### Works and Editions
* Each source record is represented as an Item (something that can actually be read online), which are grouped into Editions (e.g. the 1917 edition of X), which are in turn grouped into Works, (e.g. Moby Dick, or, The Whale). Through this a user can search for and find a single Work record and see all editions of that Work and all of its options for reading online.
* The information and code for this normalization is found in the [drb-etl-pipeline repo](https://github.com/NYPL/drb-etl-pipeline)

### Accessing books
* Books can be read three ways:
    * Embedded page:  DRB embeds a read-online page from a different source.  DRB commonly does this for Hathitrust books
    * Webpub reader:  DRB serves an epub through the [webpub-viewer](https://github.com/NYPL-Simplified/webpub-viewer/tree/SFR-develop).  DRB commonly does this for Gutenberg Project books. 
    * Download:  DRB offers a link to download the book online.  This is often done for PDFs.  

### Test

To run unit tests, run `npm run test` in the terminal. 

