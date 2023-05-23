Feature: Expect all home page elements

    Scenario: As a user I should see all home page elements
        Given I go to the "home" page
        Then I see the site name
        Then I see the Home breadcrumb
        Then I see the Research breadcrumb
        Then I see the Digital Research Books Beta breadcrumb
        Then I see the site name H1
        Then I see the intro text
        Then I see first H2 - Search the Worlds Research Collections
        Then I see search type drop down
        Then I see input field
        Then I see search button
        Then I see advanced search link
        Then I see the collections heading
        Then I see the list of collection cards
        Then I see the footer
        Then I see the feedback button
