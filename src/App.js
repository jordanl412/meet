import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberofEvents from './NumberofEvents';
import { getEvents, extractLocations, checkToken, getAccessToken } from './api';
import './nprogress.css';
import { WarningAlert } from './Alert';
import WelcomeScreen from './WelcomeScreen';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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

  getData = () => {
    const {locations, events} = this.state;
    const data = locations.map((location) => {
      const number = events.filter((event) => event.location === location).length
      const city = location.split(', ').shift()
      return {city, number};
    })
    return data;
  };

  render() {
    const { locations, eventCount } = this.state;
    if (this.state.showWelcomeScreen === undefined) return <div className="App" />
    const warningMessage = navigator.onLine ? "" : "App is running in offline mode, events may not be up to date"
    return (
      <div className="App">
        <h1>Meet App</h1>
        <h4>Choose your nearest city</h4>
        <WarningAlert text={warningMessage} />
        <CitySearch locations={locations} updateEvents={this.updateEvents} />
        <NumberofEvents updateEvents={this.updateEvents} eventCount={eventCount} />
        <h4>Events in each city</h4>

        <ResponsiveContainer height={400} >
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid />
            <XAxis
              type='category'
              dataKey='city'
              name='city' />
            <YAxis
              allowDecimals={false}
              type='number'
              dataKey='number'
              name='number of events' />
            <ToolTip cursor={{ strokeDasharray: '3 3' }} />
            <Scatter data={this.getData()} fill='8884d8' />
          </ScatterChart>
        </ResponsiveContainer>
  
        <EventList events={this.state.events}/>
        <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen} getAccessToken={() => { getAccessToken() }} />
      </div>
    );
  }
}

export default App;
