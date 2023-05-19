Feature: Language filter test

    Scenario: As a user I should be able to filter searches by language and see relevent results
        Given I go to the "home" page
        When I search for New York
        When I click the "search button"
        When I click the "Latin language checkbox"
        Then for at least 20 titles on the page, I should see Latin in the language field

