Feature: Author Search

    Scenario: As a user I search for an author and the first search result is by the author
        Given I go to the "home" page
        When I select "author" from the category dropdown
        And I fill in the "homepage search box" with "Corelli, Marie"
        And I click the "search button"
        Then the "first search result author" should be displayed