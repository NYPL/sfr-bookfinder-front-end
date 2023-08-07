Feature: Header Links

    Scenario: As a user I navigate to the Digital Research Books home page and header links navigate to the correct pages
        Given I go to the "home" page
        When I click the "header logo"
        Then the "spotlight heading" should be displayed
        When I go to the "home" page
        When I click the "my account link"
        And I click the "my account catalog link"
        Then the "my account login form" should be displayed
        When I go to the "home" page
        When I click the "my account link"
        And I click the "my account research catalog link"
        Then the "my account login form" should be displayed
        When I go to the "home" page
        When I click the "my account link"
        And I click the "close my account link"
        Then the "my account link" should be displayed