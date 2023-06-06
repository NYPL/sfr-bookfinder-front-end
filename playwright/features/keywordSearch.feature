Feature: Keyword Search

    Scenario: As a user I should be able to do a keyword search
        Given I go to the "home" page
        When I fill in the "homepage search box" with "IBM 1401"
        When I click the "search button"
        Then I count how many titles have my keyword
# Then I expect expect at least half to contain my keyword

