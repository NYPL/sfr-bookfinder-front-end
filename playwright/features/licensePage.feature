Feature: License Page

    Scenario: As a user I want to verify the headers and subheaders of DRB License Page
        Given I go to the "license" page
        Then the "license explanations header" should be displayed
        Then the "public domain header" should be displayed
        Then the "public domain us only header" should be displayed
        Then the "creative commons licenses header" should be displayed

    Scenario: As a user I verify the subheaders of DRB License Page are displayed correctly
        Given I go to the "license" page
        Then the "public domain subheader" should be displayed
        Then the "public domain us only subheader" should be displayed