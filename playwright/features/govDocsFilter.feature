Feature: Government Docs filter test

    Scenario: As a user I should be able to filter searches for government docs only and see relevent results
        Given I want to filter by government docs
        When I search for swimming
        Then I click the Government Documents filter
        Then for at least 4 titles on the page, I should see United States in the author field
