Feature: Read Online Link Targets

    Scenario: As a user I click the Read Online button on the search results page and in the item detail page and their link targets navigate to the same website
        Given I go to the "search result" page
        When I click the "first read online button"
        Then I expect to be on the Hathi Trust website
        Given I go to the "work details" page
        When I click the "first read online button"
        Then I expect to be on the Hathi Trust website

