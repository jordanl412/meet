Feature: Show/Hide an Event's Details

Scenario: An event element is collapsed by default
Given an event has loaded in the app
When the user first sees the event
Then the event's details will not be visible to the user.

Scenario: User can expand an event to see its details.
Given an event has loaded in the app
When the user clicks on the event
Then the event's details will become visible.

Scenario: User can collapse an event to hide its details.
Given an event's details are already visible
When the user clicks the hide button
Then the event's details will become hidden.