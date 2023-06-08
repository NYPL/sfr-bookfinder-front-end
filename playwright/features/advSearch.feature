Feature: Advanced Search

    Scenario: As a user I search for a keyword and author and the search results contain both the keyword and author
        Given I go to the "home" page
        When I click the "advanced search link"
        Then I should see the advanced search heading
        Then I should see the labels and inputs for the form fields
        When I fill in the "keyword search box" with "IBM 1401"
        When I fill in the "author search box" with "Laurie, Edward J."
        When I click the "advanced search button"
        Then I expect to see H1 with both keyword and author
        Then I expect to see H2 with the title "Computers and how they work"
    
    Scenario: As a user I search for multiple terms and the number of search results decrease with each term addition
        Given I go to the "home" page
        When I click the "advanced search link"
        When I fill in the "keyword search box" with "revolution"
        When I click the "advanced search button"
        When I collect the number of results for revolution
        When I click the "advanced search link"
        When I fill in the "keyword search box" with "revolution"
        When I fill in the "subject search box" with "France"
        When I click the "advanced search button"
        When I collect the number of results for revolution and France
        When I click the "English language checkbox"
        When I collect the number of results for English language
        Then I expect to see the number of results decrease with each new addition