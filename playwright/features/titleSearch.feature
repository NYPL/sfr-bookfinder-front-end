Feature: Title Search

    Scenario: As a user I should be able to do an title search and see relevant results
        Given I go to the "home" page
        When I select "title" from the category dropdown
        When I input a title search term
        When I click the "search button"
        Then I expect at least 5 titles with my title

