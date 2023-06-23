Feature: Title Search

    Scenario: As a user I search for a title and the first search result contains the title
        Given I go to the "home" page
        When I select "title" from the category dropdown
        And I fill in the "homepage search box" with "IBM 1401"
        And I click the "search button"
        Then the "first search result title" should be displayed