Feature: Publication Year filter test

    Scenario: As a user I should be able to filter searches by publication year and see relevant results
        Given I go to the "home" page
        When I fill in the "homepage search box" with "New York"
        When I click the "search button"
        When I fill in the "publication year from filter" with "1900"
        When I fill in the "publication year to filter" with "1900"
        When I click the "publication year filter button"
        Then for at least 9 titles on the page, I should see a publication year of 1900

