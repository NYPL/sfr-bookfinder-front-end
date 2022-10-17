Feature: Read Online Targets

    Scenario: As a user, when I submit a  search and I see a Read Online button on the search results page, I expect that its link target will be the same as from the button that appears on the item detail page.
        Given I am on the home page for online targets testing
        When I click Subject: Sub-saharan Africa
        When I click Read Online for the first title
        Then I expect to be on the Hathi Trust website
        When I visit the details page for the title
        Then I click the Read Online button and expect to be on the Hathi Trust website

