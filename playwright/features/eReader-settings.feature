Feature: As a user I should be able to open a title and validate the features of the e-Reader

    Scenario: As I user I am validating all the features of e-Reader is displayed
        Given I go to the "home" page
        Then I fill in the "homepage search box" with "Robot Soccer"
        And I click the "search button"
        And the "Robot Soccer title" should be displayed
        Then the "first read online button" should be displayed
