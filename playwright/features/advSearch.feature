Feature: Advanced Search

    Scenario: Advanced Search - Title and Author
        Given I go to the "home" page
        When I click the "advanced search link"
        Then I should see the advanced search heading
        Then I should see the labels and inputs for the form fields
        When I supply a keyword and author
        When I click the "advanced search button"
        Then I expect to see H1 with both keyword and author
        Then I expect to see H2 with the title "Computers and how they work"
    Scenario: Advanced Search - Keyword, Subject, Language
        Given I go to the "home" page
        When I click the "advanced search link"
        When I add more terms to the search
        Then Then I expect to see the number of results decrease with each new addition

