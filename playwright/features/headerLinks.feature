Feature: Header Links

    Scenario: As a user I navigate to the Digital Research Books home page and header links navigate to the correct pages (one click)
        Given I go to the "home" page
        When I click the <header link>
        Then the <page heading> should be displayed

        Examples:
            | header link | page heading |
            | "header logo" | "spotlight heading" |

    Scenario: As a user I navigate to the Digital Research Books home page and header links navigate to the correct pages (two clicks)
        Given I go to the "home" page
        When I click the <first header link>
        And I click the <second header link>
        Then the <page heading> should be displayed

        Examples:
            | first header link | second header link | page heading |
            | "my account link" | "my account catalog link" | "my account login form" |
            | "my account link" | "my account research catalog link" | "my account login form" |
            | "my account link" | "close my account link" | "my account link" |

