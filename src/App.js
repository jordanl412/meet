import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberofEvents from './NumberofEvents';
import { getEvents, extractLocations } from './api';
import './nprogress.css';
import { WarningAlert } from './Alert';

class App extends Component {
  state = {
    events: [],
    locations: [],
    selectedLocation: 'all',
    eventCount: 32
  }

  updateEvents = (location, inputValue) => {
    const {eventCount, selectedLocation} = this.state;
      if (location) {
        getEvents().then((events) => {
          const locationEvents = (location === 'all') ? 
          events :
          events.filter((event) => event.location === location);
          const eventsToShow = locationEvents.slice(0, eventCount);
          this.setState({
            events: eventsToShow,
            selectedLocation: location
          });
        });
      } else {
        getEvents().then((events) => {
          const locationEvents = (selectedLocation === 'all') ?
          events :
          events.filter((event) => event.location === selectedLocation);
          const eventsToShow = locationEvents.slice(0, inputValue);
          this.setState({
            events: eventsToShow,
            eventCount: inputValue
          });
        });
      }
  }

  /*updateEvents = (location) => {
    getEvents().then((events) => {
      const locationEvents = (location === 'all') ?
        events :
        events.filter((event) => event.location === location);
      this.setState({
        events: locationEvents
      });
    });
  }*/

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({ events, locations: extractLocations(events) });
      }
    });
  }

  componentWillUnmount(){
    this.mounted = false;
  }

  render() {
    const warningMessage = navigator.onLine ? "": "App is running in offline mode, events may not be up to date"
    return (
      <div className="App">
        <WarningAlert text={warningMessage} />
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
        <NumberofEvents updateEvents={this.updateEvents}/>
        <EventList events={this.state.events}/>
      </div>
    );
  }
}

export default App;
