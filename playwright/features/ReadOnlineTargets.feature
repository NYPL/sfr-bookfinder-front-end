Feature: Read Online Targets

    Scenario: As a user, when I submit a  search and I see a Read Online button on the search results page, I expect that its link target will be the same as from the button that appears on the item detail page.
        Given I go to the "search result" page
        When I click the "first read online button"
        Then I expect to be on the Hathi Trust website
        Given I go to the "work details" page
        When I click the "first read online button"
        Then I expect to be on the Hathi Trust website

