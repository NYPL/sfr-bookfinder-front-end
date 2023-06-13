Feature: Government Documents Filter

    Scenario: As a user I search for government documents and the search results display the United States as the author
        Given I go to the "home" page
        When I fill in the "homepage search box" with "swimming"
        When I click the "search button"
        When I click the "government documents checkbox"
        Then the "United States author" should be displayed