Feature: Publication Year Filter

    Scenario: As a user I filter by publication year and the first search result displays an edition with that publication year
        Given I go to the "home" page
        When I fill in the "homepage search box" with "New York"
        And I click the "search button"
        And I fill in the "publication year from filter" with "1900"
        And I fill in the "publication year to filter" with "1900"
        And I click the "publication year apply button"
        Then the "first search result edition" should be displayed
