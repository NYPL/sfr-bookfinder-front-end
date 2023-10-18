Feature: As a user I want to verify all the footer links are displayed and working as expected

    Scenario: As a user I navigate to the Digital Research Books home page and verify the footer links are displayed
        Given I go to the "home" page
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


    Scenario Outline: As a user when I click on footer links I should be navigated to respective landing page
        Given I go to the "home" page
        Then I click the <footer link>
        And the <page heading> should be displayed

        Examples:
            | footer link                         | page heading                         |
            | "accessibility footer link"         | "accessibility page heading"         |
            | "press footer link"                 | "press page heading"                 |
            | "careers footer link"               | "careers page heading"               |
            | "space rental footer link"          | "space rental page heading"          |
            | "privacy footer link"               | "privacy page heading"               |
            | "other policies footer link"        | "other policies page heading"        |
            | "terms and conditions footer link"  | "terms and conditions page heading"  |
            | "governance footer link"            | "governance page heading"            |
            | "rules and regulations footer link" | "rules and regulations page heading" |
            | "about footer link"                 | "about page heading"                 |
            | "language footer link"              | "language page heading"              |