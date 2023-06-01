Feature: Testing EDD button functionality

    Scenario: As a user I should see the EDD request process
        Given I go to the "home" page
        When I have done a keyword search
        When I click the "search button"
        When I click the "requestable checkbox"
        When I click the "first login for options button"
        Then I log in to the catalog
        When I click the "login button"
        When I click the "first request button"
        Then I expect to see delivery options