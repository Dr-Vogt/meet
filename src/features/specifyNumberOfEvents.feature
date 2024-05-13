Feature: Specify Number Of Events

Scenario: Default number of events shown
 Given the user has not specified the number of events
 When the user views the events
 Then the user should see 32 events by default

Scenario: The user can change the number of events displayed
 Given a user opens the app
 When the user changes the value of number of events input
 Then the user should see the updated number of events