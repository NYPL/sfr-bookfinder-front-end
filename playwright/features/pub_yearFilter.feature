Feature: Publication Year filter test

    Scenario: As a user I should be able to filter searches by publication year and see relevent results
        Given I want to filter by publication year
        When I search for New York to test publication year filter
        Then I input publication years 1900-1900
        Then for at least 9 titles on the page, I should see a publication year of 1900

