Feature: Advanced Search

    Scenario: As a user I search for a keyword and author and the search results contain both the keyword and author
        Given I go to the "home" page
        When I click the "advanced search link"
        Then the "advanced search heading" should be displayed
        And the "keyword search label" should be displayed
        And the "keyword search box" should be displayed
        And the "author search label" should be displayed
        And the "author search box" should be displayed
        And the "subject search label" should be displayed
        And the "subject search box" should be displayed
        And the "title search label" should be displayed
        And the "title search box" should be displayed
        And the "date filter from label" should be displayed
        And the "date filter from field" should be displayed
        And the "date filter to label" should be displayed
        And the "date filter to field" should be displayed
        And the "advanced search button" should be displayed
        And the "advanced search clear button" should be displayed
        When I fill in the "keyword search box" with "IBM 1401"
        And I fill in the "author search box" with "Laurie, Edward J."
        And I click the "advanced search button"
        Then the "keyword heading" should be displayed
        And the "author heading" should be displayed
        And the "search result link" should be displayed

    Scenario: As a user I select a language checkbox in advanced search and verify the search results
        Given I go to the "home" page
        When I click the "advanced search link"
        Then I fill in the "keyword search box" with "Jane Austen"
        And I click the "Russian language checkbox"
        And I click the "advanced search button"
        Then the "Russian language subheader" should be displayed
        And the "Russian language checkbox" should be checked
        And the "first read online button" should be displayed
