Feature: Advanced Search

    Scenario: As a user I search for a keyword and author and the search results contain both the keyword and author
        Given I go to the "home" page
        When I click the "advanced search link"
        Then the "advanced search heading" should be displayed
        Then the "keyword search label" should be displayed
        Then the "keyword search box" should be displayed
        Then the "author search label" should be displayed
        Then the "author search box" should be displayed
        Then the "subject search label" should be displayed
        Then the "subject search box" should be displayed
        Then the "title search label" should be displayed
        Then the "title search box" should be displayed
        Then the "date filter from label" should be displayed
        Then the "date filter from field" should be displayed
        Then the "date filter to label" should be displayed
        Then the "date filter to field" should be displayed
        Then the "advanced search button" should be displayed
        Then the "advanced search clear button" should be displayed
        When I fill in the "keyword search box" with "IBM 1401"
        When I fill in the "author search box" with "Laurie, Edward J."
        When I click the "advanced search button"
        Then the "keyword heading" should be displayed
        Then the "author heading" should be displayed
        Then the "search result link" should be displayed