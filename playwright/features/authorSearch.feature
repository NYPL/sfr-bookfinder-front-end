Feature: Author Search

    Scenario: As a user I should be able to do an author search and see relevent results
        Given I want to do an author search
        When I change the dropdown to author
        When I input an author search term
        Then I count how many titles are returned
# Then I expect expect at least 6 to contain my author

