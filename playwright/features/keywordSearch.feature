Feature: Keyword Search

    Scenario: As a user I should be able to do a keyword search
        Given I am on the DRB home page for searching
        When I input a search term
        Then I count how many titles have my keyword
# Then I expect expect at least half to contain my keyword

