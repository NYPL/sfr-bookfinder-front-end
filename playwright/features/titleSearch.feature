Feature: Title Search

    Scenario: As a user I search for a title and at least 5 search results contain the title
        Given I go to the "home" page
        When I select "title" from the category dropdown
        When I input a title search term
        When I click the "search button"
        Then I expect at least 5 titles with my title

