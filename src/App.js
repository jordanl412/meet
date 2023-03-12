import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberofEvents from './NumberofEvents';
import { getEvents, extractLocations, checkToken, getAccessToken } from './api';
import './nprogress.css';
import { WarningAlert } from './Alert';
import WelcomeScreen from './WelcomeScreen';

class App extends Component {
  state = {
    events: [],
    locations: [],
    selectedLocation: 'all',
    eventCount: 32,
    showWelcomeScreen: undefined
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

  async componentDidMount() {
    this.mounted = true;
    const accessToken = localStorage.getItem('access_token');
    const isTokenValid = (await checkToken(accessToken)).error ? false : true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code');
    this.setState({ showWelcomeScreen: !(code || isTokenValid) });
    if ((code || isTokenValid) && this.mounted) {
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({ events, locations: extractLocations(events) });
        }
      });
    }
  }

  componentWillUnmount(){
    this.mounted = false;
  }

  render() {
    if (this.state.showWelcomeScreen === undefined) return <div className="App" />
    const warningMessage = navigator.onLine ? "": "App is running in offline mode, events may not be up to date"
    return (
      <div className="App">
        <WarningAlert text={warningMessage} />
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
        <NumberofEvents updateEvents={this.updateEvents}/>
        <EventList events={this.state.events}/>
        <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen} getAccessToken={() => { getAccessToken() }} />
      </div>
    );
  }
}

export default App;
