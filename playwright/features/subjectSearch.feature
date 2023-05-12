Feature: Subject Search

    Scenario: As a user I should be able to do an subject search and see relevent results
        Given I go to the "home" page
        When I change the dropdown to subject
        When I input a subject search term and submit
        Then Then for each title on the page, I visit the details page and expect to see the subject listed

