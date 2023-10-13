Feature: Home Page Elements

    Scenario: As a user I navigate to the Digital Research Books home page and all home page elements are displayed
        Given I go to the "home" page
        Then the "site name heading" should be displayed
        And the "Home breadcrumb link" should be displayed
        And the "Research breadcrumb link" should be displayed
        And the "Digital Research Books Beta breadcrumb link" should be displayed
        And the "intro text" should be displayed
        And the "search heading" should be displayed
        And the "search category dropdown" should be displayed
        And the "homepage search box" should be displayed
        And the "search button" should be displayed
        And the "advanced search link" should be displayed
        And the "collections heading" should be displayed
        And the "first collection card link" should be displayed
        And the "footer" should be displayed
        And the "feedback button" should be displayed

    Scenario: As a user I verify feedback button is displayed on homepage
        Given I go to the "home" page
        Then the "feedback and help button" should be displayed