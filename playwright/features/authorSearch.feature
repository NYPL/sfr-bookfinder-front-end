Feature: Author Search

    Scenario: As a user I search for an author and at least 5 search results are by the author
        Given I go to the "home" page
        When I select "author" from the category dropdown
        When I input an author search term
        When I click the "search button"
        Then I expect at least 5 titles by my author

