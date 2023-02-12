import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberofEvents from './NumberofEvents';
import { getEvents, extractLocations } from './api';
import './nprogress.css';

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
    return (
      <div className="App">
        <EventList events={this.state.events}/>
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
        <NumberofEvents updateEvents={this.updateEvents}/>
      </div>
    );
  }
}

export default App;
