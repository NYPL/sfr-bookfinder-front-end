Feature: Language Filter

    Scenario: As a user I filter search results by a particular language and the first search result contains that language
        Given I go to the "home" page
        When I fill in the "homepage search box" with "New York"
        And I click the "search button"
        And I click the "Latin language checkbox"
        Then the "first search result language" should be displayed