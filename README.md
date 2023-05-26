# meet app

## Project Description
The meet app is a Progressive Web App (PWA offering offline usability), created with React. The app utilizes serverless functions through Amazon Web Services (AWS) and the Google Calendar API. It shows detailed information about upcoming events in different cities. Users can search for events by city, and filter how many events they want to see at once. There are also graphs of number of events in each city.

Currently, the meet app displays events from the CareerFoundry Google calendar.

## Key Features
### Feature 1: Filter Events by City
**User Story**
As a User, I should be able to filter events by city so that I can find events that are happening in a specific location.
#### Scenario 1: When user hasn't searched for a city, show upcoming events from all cities
Given the user hasn't searched for any city, when the user opens the app, then the user should see a list of upcoming events in all cities
#### Scenario 2: User should see a list of suggestions when they search for a city
Given the main page is open, when the user starts typing in the city textbox, then the user should see a list of cities (suggestions) that match what the user has typed
#### Scenario 3: User can select a city from the suggested list
Given the user was typing "Berlin" in the city textbox and the list of suggested cities is showing, when the user selects a city (e.g., "Berlin, Germany") from the list, then their city should be changed to that city (i.e., "Berlin, Germany") and the user should receive a list of upcoming events in that city
### Feature 2: Show/Hide an Event's Details
**User Story**
As a User, I should be able to show or hide an event's details so that I can see more information about a specific event, or see less information if I am no longer looking at a specific event.
#### Scenario 1: An event element is collapsed by default
Given an event has loaded in the app, when the user first sees the event, then the event's details will not be visible to the user
#### Scenario 2: User can expand an event to see its details
Given an event has loaded in the app, when the user clicks on the event, then the event's details will become visible
#### Scenario 3: User can collapse an event to hide its details
Given an event's details are already visible, when the user clicks the "hide" button, then the event's details will become hidden
### Feature 3: Specify Number of Events
**User Story**
As a User, I should be able to specify the number of events shown on the app so that I can control how many events are viewable.
#### Scenario 1: When user hasn't specified a number, 32 is the default number
Given the user hasn't specific a number of events to load, when the user uses the app, then the number of events shown will be 32
#### Scenario 2: User can change the number of events they want to see
Given the user has specified the number of events to load, when the user uses the app, then the number of events shown will be the amount selected by the user
### Feature 4: Use the App when Offline
**User Story**
As a User, I should be able to use the app when I'm offline so that, in the event that I have no internet connection, I can still find pre-loaded events in a location.
#### Scenario 1: Show cached data when there's no internet connection
Given the user has previously opened the app with internet connection, when the user opens the app without internet connection, then the app will load cached data from the last time the user used the app
#### Scenario 2: Show error when user changes the settings (city, time range)
Given there is no internet connection, when the user tries to change a setting (like city or time range), then the user will see an error message
### Feature 5: Data Visualization
**User Story**
As a User, I should be able to see event data in a visual so that I can see an overview of all events in a specific location.
#### Scenario 1: Show a chart with the number of upcoming events in each city
Given there are upcoming events listed for a specific city, when the user searches for events in that city, then the app will show a chart with the number of upcoming events in that city

## Built With
- HTML, CSS, JavaScript
- React
- Amazon Web Services serverless functions
- Google Calendar API
