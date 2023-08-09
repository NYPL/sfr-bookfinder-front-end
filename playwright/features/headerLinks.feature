Feature: Header Links

    Scenario: As a user I navigate to the Digital Research Books home page and header links navigate to the correct pages (one click)
        Given I go to the "home" page
        When I click the <header link>
        Then the <page heading> should be displayed

        Examples:
            | header link | page heading |
            | "header logo" | "spotlight heading" |
            | "locations header link" | "locations breadcrumb" |
            | "library card header link" | "library card page heading" |
            | "email updates header link" | "" |
            | "donate header link" | "" |
            | "shop header link" | "" |
            | "books music movies header link | "" |
            | "research header link" | "" |
            | "education header link" | "" |
            | "events header link" | "" |
            | "connect header link" | "" |
            | "give header link" | "" |
            | "get help header link" | "" |
            | "search header link" | "" |

    Scenario: As a user I navigate to the Digital Research Books home page and header links navigate to the correct pages (two clicks)
        Given I go to the "home" page
        When I click the <first header link>
        And I click the <second header link>
        Then the <page heading> should be displayed

        Examples:
            | first header link | second header link | page heading |
            | "my account header link" | "my account catalog link" | "my account login form" |
            | "my account header link" | "my account research catalog link" | "my account login form" |
            | "my account header link" | "close my account link" | "my account header link" |

