Feature: Keyword Search

    Scenario: As a user I search for a keyword and the first search result contains the keyword
        Given I go to the "home" page
        When I fill in the "homepage search box" with "IBM 1401"
        And I click the "search button"
        Then the "keyword in first search result" should be displayed