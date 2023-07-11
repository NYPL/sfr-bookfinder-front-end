Feature: As a user I should be able to open a title and validate the features of the e-Reader

    Scenario: As I user I am validating all the features of e-Reader is displayed
        Given I go to the "home" page
        Then I fill in the "homepage search box" with "Robot Soccer"
        And I click the "search button"
        And the "Robot Soccer title" should be displayed
        And I click the "first read online button"
        And the "e-reader table of contents button" should be displayed
        And the "e-reader settings button" should be displayed
        And the "e-reader full screen button" should be displayed
        And the "e-reader back to DRB button" should be displayed

