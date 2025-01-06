Feature: EDD Request Process

    Scenario: As a user I begin the EDD request process and the delivery locations page is displayed
        Given I go to the "home" page
        When I fill in the "homepage search box" with "Africa"
        And I click the "search button"
        And I click the "requestable checkbox"        
        And I click the "first login for options button"
        And I fill in the "username field" with "catalog username"
        And I fill in the "password field" with "catalog password"
        And I click the "login button"
        And the "first request button" should be displayed
        And I click the "first request button"
        Then the "delivery location heading" should be displayed
