Feature: Show/Hide Event Details

Scenario: The details of an event are hidden by default
 Given the main page is open 
 When the app displays a list of events
 Then the event details are hidden by default

 Scenario: User clicks to show event details
 Given there is an event with hidden details 
 When the user clicks on the event to show details  
 Then the app should display the details of the event 

 Scenario: User clicks to hide event details
 Given there is an event with displayed details 
 When the user clicks on the event again to hide details
 Then the app should hide the event details