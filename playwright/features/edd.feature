Feature: Testing EDD button functionality

    Scenario: As a user I should see the EDD request process
        Given I go to the "home" page
        When I fill in the "homepage search box" with "Africa"
        When I click the "search button"
        When I click the "requestable checkbox"
        When I click the "first login for options button"
        When I fill in the "username field" with "catalog username"
        When I fill in the "password field" with "catalog password"
        When I click the "login button"
        When I click the "first request button"
        Then I expect to see delivery options