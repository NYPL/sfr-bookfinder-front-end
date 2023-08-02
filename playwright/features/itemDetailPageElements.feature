Feature: Item Detail Page Elements

    Scenario: As a user I navigate to an item detail page and all item detail page elements are displayed
        Given I go to the "item detail" page
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