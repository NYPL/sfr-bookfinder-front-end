Feature: Home Page Elements

    Scenario: As a user I navigate to the Digital Research Books home page and all home page elements are displayed
        Given I go to the "home" page
        Then the "site name heading" should be displayed
        Then the "Home breadcrumb link" should be displayed
        Then the "Research breadcrumb link" should be displayed
        Then the "Digital Research Books Beta breadcrumb link" should be displayed
        Then the "intro text" should be displayed
        Then the "search heading" should be displayed
        Then the "search category dropdown" should be displayed
        Then the "homepage search box" should be displayed
        Then the "search button" should be displayed
        Then the "advanced search link" should be displayed
        Then the "collections heading" should be displayed
        Then the "first collection card link" should be displayed
        Then the "footer" should be displayed
        Then the "feedback button" should be displayed