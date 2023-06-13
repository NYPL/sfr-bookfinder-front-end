Feature: Subject Search

    Scenario: As a user I search for a subject and the details of the first search result contains the subject
        Given I go to the "home" page
        When I select "subject" from the category dropdown
        When I fill in the "homepage search box" with "petroleum"
        When I click the "search button"
        When I click the "first search result link"
        Then the "first search result subject" should be displayed
