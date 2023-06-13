Feature: Title Search

    Scenario: As a user I search for a title and at least 5 search results contain the title
        Given I go to the "home" page
        When I select "title" from the category dropdown
        When I fill in the "homepage search box" with "IBM 1401"
        When I click the "search button"
        Then the "first search result title" should be displayed