Feature: Header Links

    Scenario: As a user I navigate to the Digital Research Books home page and header links navigate to the correct pages (one click)
        Given I go to the "home" page
        When I click the <header link>
        Then the <page heading> should be displayed

        Examples:
            | header link                       | page heading                      |
            | "header logo"                     | "spotlight heading"               |
            | "locations header link"           | "find your library page heading"  |
            | "library card header link"        | "library card page heading"       |
            | "email updates header link"       | "email updates page heading"      |
            | "donate header link"              | "donate page heading"             |
            | "shop header link"                | "shop page heading"               |
            | "books music movies header link"  | "books music movies page heading" |
            | "research header link"            | "research page heading"           |
            | "education header link"           | "education page heading"          |
            | "events header link"              | "events page heading"             |
            | "connect header link"             | "connect page heading"            |
            | "give header link"                | "give page heading"               |
            | "get help header link"            | "get help page heading"           |
            | "search header link"              | "search header label"             |
            

    Scenario: As a user I navigate to the Digital Research Books home page and header links navigate to the correct pages (two clicks)
        Given I go to the "home" page
        When I click the <first header link>
        And I click the <second header link>
        Then the <page heading> should be displayed

        Examples:
            | first header link         | second header link                | page heading              |
            | "my account header link"  | "catalog header link"             | "my account login form"   |
            | "my account header link"  | "research catalog header link"    | "my account login form"   |
            | "my account header link"  | "close my account header link"    | "my account header link"  |
            | "search header link"      | "close search header link"        | "search header link"      |
