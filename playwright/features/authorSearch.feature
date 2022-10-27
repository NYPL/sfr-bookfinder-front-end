Feature: Author Search

    Scenario: As a user I should be able to do an author search and see relevent results
        Given I want to do an author search
        When I change the dropdown to author
        When I input an author search term
        Then I expect at least 5 title by my author

