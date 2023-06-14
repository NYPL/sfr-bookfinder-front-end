Feature: Government Documents Filter

    Scenario: As a user I search for government documents and the first search result displays the United States as the author
        Given I go to the "home" page
        When I fill in the "homepage search box" with "swimming"
        And I click the "search button"
        And I click the "government documents checkbox"
        Then the "author of first government document" should be displayed