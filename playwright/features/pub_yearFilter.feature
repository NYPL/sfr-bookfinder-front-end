Feature: Publication Year filter test

    Scenario: As a user I should be able to filter searches by publication year and see relevent results
        Given I go to the "home" page
        When When I search for New York
        When I click the "search button"
        Then I filter by publication years 1900-1900
        When I click the "year filter button"
        Then for at least 9 titles on the page, I should see a publication year of 1900

