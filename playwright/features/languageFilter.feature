Feature: Language Filter

    Scenario: As a user I filter search results by a Latin language and the first search result contains that language
        Given I go to the "home" page
        When I fill in the "homepage search box" with "New York"
        And I click the "search button"
        And I click the "Latin language checkbox"
        Then the "first search result Latin language" should be displayed


    Scenario: As a user I filter search results by a Spanish language and the first search result contains that language
        Given I go to the "home" page
        When I fill in the "homepage search box" with "New York"
        And I click the "search button"
        And I click the "Spanish language checkbox"
        Then the "first search result Spanish language" should be displayed

    Scenario: As a user I filter search results by a Japanese language and the first search result contains that language
        Given I go to the "home" page
        When I fill in the "homepage search box" with "New York"
        And I click the "search button"
        And I click the "Japanese language checkbox"
        Then the "first search result Japanese language" should be displayed

    Scenario: As a user I filter search results by a Polish language and the first search result contains that language
        Given I go to the "home" page
        When I fill in the "homepage search box" with "Poland"
        And I click the "search button"
        And I click the "Polish language checkbox"
        Then the "first search result Polish language" should be displayed

    Scenario: As a user I filter search results by a Portuguese language and the first search result contains that language
        Given I go to the "home" page
        When I fill in the "homepage search box" with "Lisbon"
        And I click the "search button"
        And I click the "Portuguese language checkbox"
        Then the "first search result Portuguese language" should be displayed
