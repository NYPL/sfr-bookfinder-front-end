Feature: Publication Year Filter

    Scenario: As a user I filter by publication year and the search results display editions with that publication year
        Given I go to the "home" page
        When I fill in the "homepage search box" with "New York"
        When I click the "search button"
        When I fill in the "publication year from filter" with "1900"
        When I fill in the "publication year to filter" with "1900"
        When I click the "publication year filter button"
        Then the "1900 editions" should be displayed