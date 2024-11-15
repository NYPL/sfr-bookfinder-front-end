Feature: EDD Request Process

    Scenario: As a user I begin the EDD request process and the delivery locations page is displayed
        Given I go to the "home" page
        When I fill in the "homepage search box" with "Africa"
        And I click the "search button"
        And I click the "requestable checkbox"
        Then the "first login for options button" should be displayed
