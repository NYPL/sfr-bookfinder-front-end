Feature: Author Search

    Scenario: As a user I should be able to do an author search and see relevant results
        Given I go to the "home" page
        When I change the dropdown to author
        When I input an author search term
        Then I expect at least 5 title by my author

