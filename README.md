# meet
Feature: Show/Hide Event Details

Scenario: Event element is collapsed by default
    Given an event element
    When I view the event
    Then the details should be collapsed

Scenario: User can expand an event to see details
    Given an event element
    When I expand the event
    Then I should see the details

Scenario: User can collapse an event to hide details
    Given an expanded event element
    When I collapse the event
    Then the details should be hidden
    
Feature: Specify Number of Events

Scenario: Default number of events shown
    Given no specified number of events
    When I view the events
    Then I should see 32 events

Scenario: User can change the number of events displayed
    Given the option to specify the number of events
    When I change the number of events
    Then I should see the updated number of events

Feature: Use the App When Offline

Scenario: Show cached data when there's no internet connection
    Given no internet connection
    When I try to access the app
    Then I should see cached data

Scenario: Show error when user changes search settings offline
    Given no internet connection
    When I try to change search settings
    Then I should see an error message

Feature: Add an App Shortcut to the Home Screen

Scenario: User can install the meet app as a shortcut on their device home screen
    Given the option to install shortcuts
    When I choose to install the app shortcut
    Then I should see it on my device home screen

Feature: Display Charts Visualizing Event Details

Scenario: Show chart with number of upcoming events in each city
    Given upcoming events in different cities
    When I view the chart
    Then I should see the number of events for each city

