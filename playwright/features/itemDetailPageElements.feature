Feature: Item Detail Page Elements

    Scenario: As a user I navigate to an item detail page and all item detail page elements are displayed
        Given I go to the "item detail" page
        Then the "item title" should be displayed
        Then the "item author" should be displayed
        Then the "item featured edition heading" should be displayed
        Then the "item featured edition cover" should be displayed
        Then the "item edition year" should be displayed
        Then the "item edition publisher" should be displayed
        Then the "item edition language" should be displayed
        Then the "item edition license" should be displayed
        Then the "item details heading" should be displayed
        Then the "item details authors heading" should be displayed
        Then the "item details authors" should be displayed
        Then the "item details subjects heading" should be displayed
        Then the "item details subjects" should be displayed
        Then the "item details languages heading" should be displayed
        Then the "item details languages" should be displayed
        Then the "item all editions heading" should be displayed
        Then the "items currently available online toggle text" should be displayed
        Then the "items currently available online toggle" should be displayed
        Then the "second item edition" should be displayed