Feature: Specify Number of Events

Scenario: When user hasn't specified a number, 32 is the number
Given the user has not specified a number of events to load
When the user uses the app
Then the number of events shown will be 32.

Scenario: User can change the number of events they want to see
Given the user has specified the number of events to load
When the user uses the app
Then the number of events shown will be the amount selected by the user.