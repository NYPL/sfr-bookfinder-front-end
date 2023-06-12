Feature: EDD Request Process

    Scenario: As a user I begin the EDD request process and the delivery locations are displayed
        Given I go to the "home" page
        When I fill in the "homepage search box" with "Africa"
        When I click the "search button"
        When I click the "requestable checkbox"
        When I click the "first login for options button"
        When I fill in the "username field" with "catalog username"
        When I fill in the "password field" with "catalog password"
        When I click the "login button"
        When I click the "first request button"
        Then the "delivery location heading" should be displayed