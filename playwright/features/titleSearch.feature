Feature: Title Search

    Scenario: As a user I should be able to do an title search and see relevent results
        Given I want to do a title search
        When I change the dropdown to title
        When I input a title search term
        Then I expect at least 5 titles with my title

