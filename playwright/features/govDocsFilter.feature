Feature: Government Docs filter test

    Scenario: As a user I should be able to filter searches for government docs only and see relevant results
        Given I go to the "home" page
        When I search for swimming
        When I click the "search button"
        When I click the "government documents checkbox"
        Then for at least 4 titles on the page, I should see United States in the author field

