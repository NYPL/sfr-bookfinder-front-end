Feature: Item Detail Page Elements

    Scenario: As a user I navigate to an item detail page and all item detail page elements are displayed
        Given I go to the "item detail" page
        And the "search category dropdown" should be displayed
        And the "homepage search box" should be displayed
        And the "search button" should be displayed
        And the "advanced search link" should be displayed
        Then the "item title" should be displayed
        And the "item author" should be displayed
        And the "item featured edition heading" should be displayed
        And the "item featured edition cover" should be displayed
        And the "item featured edition year" should be displayed
        And the "item featured edition publisher" should be displayed
        And the "item featured edition language" should be displayed
        And the "item featured edition license" should be displayed
        And the "item details heading" should be displayed
        And the "item details authors heading" should be displayed
        And the "item details authors" should be displayed
        And the "item details subjects heading" should be displayed
        And the "item details subjects" should be displayed
        And the "item details languages heading" should be displayed
        And the "item details languages" should be displayed
        And the "item all editions heading" should be displayed
        And the "items currently available online toggle text" should be displayed
        And the "items currently available online toggle" should be displayed
        And the "second item edition" should be displayed

    Scenario: As a user when I click on "show only items currently available online" button, only online available books should be displayed
        Given I go to the "item detail" page
        Then I double click the "items currently available online toggle"
        And the "first read online button for all editions" should be displayed

    Scenario: As a user when I am on item details page for a collection, I should see back to search results button
        Given I go to the "home" page
        Then I fill in the "homepage search box" with "Jane Austen"
        And I click the "search button"
        And I click the "The Novels of Jane Austen link"
        And the "The Novels of Jane Austen heading" should be displayed
        And the "back to search results button" should be displayed
        And I click the "back to search results button"
        And the "The Novels of Jane Austen link" should be displayed