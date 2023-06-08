Feature: Language Filter

    Scenario: As a user I search by a language and the search results display the language
        Given I go to the "home" page
        When I fill in the "homepage search box" with "New York"
        When I click the "search button"
        When I click the "Latin language checkbox"
        Then for at least 20 titles on the page, I should see Latin in the language field

