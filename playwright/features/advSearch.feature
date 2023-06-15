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
    
    Scenario: As a user I search for multiple terms and the number of search results decrease with each term addition
        Given I go to the "home" page
        When I click the "advanced search link"
        And I fill in the "keyword search box" with "revolution"
        And I click the "advanced search button"
        Then the number of results for revolution should be displayed
        When I click the "advanced search link"
        And I fill in the "keyword search box" with "revolution"
        And I fill in the "subject search box" with "France"
        And I click the "advanced search button"
        Then the number of results for revolution and France should be displayed
        When I click the "English language checkbox"
        Then the number of results for revolution, France, and English language should be displayed
        Then the number of results decrease with each new addition