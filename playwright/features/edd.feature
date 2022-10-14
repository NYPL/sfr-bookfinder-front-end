Feature: Testing EDD button functionality

    Scenario: As a user I should see the EDD request process
        Given I have done a keyword search
        When I click the requestable box
        Then I see a result with the 'Log in for options' text and I click it
        Then I log in to the catalog
        Then I click the first request button
        Then I expect to see delivery options
# Then I expect to see a Request button
# When I click the Request button
# Then I switch browser tabs since Research Catalog opens in new tab
# Then I expect to see the title while in the Research Catalog