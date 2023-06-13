Feature: Author Search

    Scenario: As a user I search for an author and at least 5 search results are by the author
        Given I go to the "home" page
        When I select "author" from the category dropdown
        When I fill in the "homepage search box" with "Corelli, Marie"
        When I click the "search button"
        Then the "first search result author" should be displayed

