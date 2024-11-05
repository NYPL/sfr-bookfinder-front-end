Feature: Specific Pub Sources
    Scenario: As a user I search for title "How safe is eating chicken" and open the title after search result is loaded
        Given I go to the "home" page
        When I select "title" from the category dropdown
        And I fill in the "homepage search box" with "How safe is eating chicken?"
        And I click the "search button"
        And I click the "first read online button"
        And the "e-reader settings button" should be displayed

    Scenario: Chicken Farm
        Given I go to the "home" page
        When I select "title" from the category dropdown
        And I fill in the "homepage search box" with "Chicken Farm"
        And I click the "search button"
        And I click the "first read online button"
        And the "e-reader settings button" should be displayed

    Scenario: Reading Fiction in Antebellum America
        Given I go to the "home" page
        When I select "title" from the category dropdown
        And I fill in the "homepage search box" with "Reading Fiction in Antebellum America"
        And I click the "search button"
        And I click the "first read online button"
        And the "e-reader settings button" should be displayed

    Scenario: Climate Change and Agriculture
        Given I go to the "home" page
        When I select "title" from the category dropdown
        And I fill in the "homepage search box" with "Climate Change and Agriculture"
        And I click the "search button"
        And I click the "first read online button"
        And the "e-reader settings button" should be displayed
