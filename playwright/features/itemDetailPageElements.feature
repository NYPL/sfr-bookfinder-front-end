Feature: Expect all item detail page elements

    Scenario: As a user I should see all item detail page elements
        Given I am on an item detail page
        Then I see the item title
        Then I see the item author
        Then I see the featured edition heading
        Then I see multiple cover images
        Then I see the edition year
        Then I see the edition publisher
        Then I see the edition language
        Then I see the edition license
        Then I see the details heading
        Then I see the authors heading
        Then I see the author
        Then I see the subjects heading
        Then I see the subjects
        Then I see the languages heading
        Then I see the language
        Then I see the all editions heading
        Then I see the currently available online toggle text
        Then I see the currently available online toggle switch
        Then I see at least one edition


