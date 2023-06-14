Feature: Subject Search

    Scenario: As a user I search for a subject and the details of the first search result contains the subject
        Given I go to the "home" page
        When I select "subject" from the category dropdown
        And I fill in the "homepage search box" with "petroleum"
        And I click the "search button"
        And I click the "first search result link"
        Then the "subject in first search result" should be displayed