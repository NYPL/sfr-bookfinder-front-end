Feature: Advanced Search

    Scenario: As a user I should be able to do an advanced search and see relevent results
        Given I want to do an advanced search
        When I click the adavanced search link
        Then I should see the advanced search heading
        Then I should see the labels and inputs for the form fields

        When I supply a keyword and author and submit
# Then I expect to see H1 with both keyword and author in text
# Then I expect to see H2 with the title "Computers and how they work"
# When I supply just a keyword
# Then I expect to see greater than 3000 search results
# When I add a subject to the search I expect a reduced count of results
# When I add a language to the search I expect a reduced count of results
# When I add a year filter to the search I expect a reduced count of results
