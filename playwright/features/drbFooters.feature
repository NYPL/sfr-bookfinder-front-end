Feature: Footer Links

    Scenario: As a user I navigate to each Digital Research Books page and verify the footer links are displayed
        Given I go to the <DRB> page
        And the "accessibility footer link" should be displayed
        And the "press footer link" should be displayed
        And the "careers footer link" should be displayed
        And the "space rental footer link" should be displayed
        And the "privacy footer link" should be displayed
        And the "other policies footer link" should be displayed
        And the "terms and conditions footer link" should be displayed
        And the "governance footer link" should be displayed
        And the "rules and regulations footer link" should be displayed
        And the "about footer link" should be displayed
        And the "language footer link" should be displayed

        Examples:
        | DRB                 |
        | "home"              |
        | "search results"    |
        | "item details"      |
        | "work details"      |
        | "edition details"   |
        | "collection"        |
        | "read online"       |
        | "license"           |
        | "about"             |
