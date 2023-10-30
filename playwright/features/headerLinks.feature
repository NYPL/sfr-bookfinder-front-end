Feature: Header Links

    Scenario: As a user I navigate to each Digital Research Books page and verify the header links are displayed
        Given I go to the <DRB> page
        Then the "header logo" should be displayed
        And the "my account header link" should be displayed
        And the "locations header link" should be displayed
        And the "library card header link" should be displayed
        And the "email updates header link" should be displayed
        And the "donate header link" should be displayed
        And the "shop header link" should be displayed
        And the "books music movies header link" should be displayed
        And the "research header link" should be displayed
        And the "education header link" should be displayed
        And the "events header link" should be displayed
        And the "connect header link" should be displayed
        And the "give header link" should be displayed
        And the "get help header link" should be displayed
        And the "search header link" should be displayed

           Examples:
            | DRB                 |
            | "home"              |
            | "advanced search"   |
            | "search results"    |
            | "item details"      |
            | "edition details"   |
            | "collection"        |
            | "read online"       |
            | "license"           |
            | "about"             |  

    Scenario: As a user I navigate to the Digital Research Books home page and verify the account and search header sub-links and elements are displayed
        Given I go to the "home" page
        When I click the <first header link>
        Then the <second header link> should be displayed

        Examples:
            | first header link         | second header link                       |
            | "my account header link"  | "catalog header link"                    |
            | "my account header link"  | "research catalog header link"           |
            | "my account header link"  | "close my account header link"           |
            | "search header link"      | "search header label"                    |
            | "search header link"      | "search header text field"               |
            | "search header link"      | "search books music movies radio button" |
            | "search header link"      | "search research catalog radio button"   |
            | "search header link"      | "search library website radio button"    |
            | "search header link"      | "search header button"                   |
            | "search header link"      | "close search header link"               |
