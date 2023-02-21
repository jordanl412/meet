import React from 'react';
import { shallow, mount } from 'enzyme';
import App from "../App";
import EventList from '../EventList';
import CitySearch from '../CitySearch';
import NumberofEvents from '../NumberofEvents';
import { mockData } from '../mock-data';
import { extractLocations, getEvents } from '../api';

describe('<App /> component', () => {
    let AppWrapper;
    beforeAll(() => {
        AppWrapper = shallow(<App />);
    });

    test('render list of events', () => {
        expect(AppWrapper.find(EventList)).toHaveLength(1);
    });

    test('render CitySearch', () => {
        expect(AppWrapper.find(CitySearch)).toHaveLength(1);
    });

    test('render NumberofEvents', () => {
        expect(AppWrapper.find(NumberofEvents)).toHaveLength(1);
    });

});

describe('<App /> integration', () => {
    test('App passes "events" state as a prop to EventList', () => {
        const AppWrapper = mount(<App />);
        const AppEventsState = AppWrapper.state('events');
        expect(AppEventsState).not.toEqual(undefined);
        expect(AppWrapper.find(EventList).props().events).toEqual(AppEventsState);
        AppWrapper.unmount();
    });

    test('App passes "locations" state as a prop to CitySearch', () => {
        const AppWrapper = mount(<App />);
        const AppLocationsState = AppWrapper.state('locations');
        expect(AppLocationsState).not.toEqual(undefined);
        expect(AppWrapper.find(CitySearch).props().locations).toEqual(AppLocationsState);
        AppWrapper.unmount();
    });

    test('get list of events matching the city selected by the user', async () => {
        const AppWrapper = mount(<App />);
        const CitySearchWrapper = AppWrapper.find(CitySearch);
        const locations = extractLocations(mockData);
        CitySearchWrapper.setState({ suggestions: locations });
        const suggestions = CitySearchWrapper.state('suggestions');
        const selectedIndex = Math.floor(Math.random() * (suggestions.length));
        const selectedCity = suggestions[selectedIndex];
        await CitySearchWrapper.instance().handleItemClicked(selectedCity);
        const allEvents = await getEvents();
        const eventsToShow = allEvents.filter(event => event.location === selectedCity);
        expect(AppWrapper.state('events')).toEqual(eventsToShow);
        AppWrapper.unmount();
    });

    test('get list of all events when user selects "See all cities"', async () => {
        const AppWrapper = mount(<App />);
        const suggestionItems = AppWrapper.find(CitySearch).find('.suggestions li');
        await suggestionItems.at(suggestionItems.length - 1).simulate('click');
        const allEvents = await getEvents();
        expect(AppWrapper.state('events')).toEqual(allEvents);
        AppWrapper.unmount();
    });

    test('App passes "eventCount" state as a prop to NumberofEvents', () => {
        const AppWrapper = mount(<App />);
        const AppEventCountState = AppWrapper.state('eventCount');
        expect(AppEventCountState).not.toEqual(undefined);
        expect(AppWrapper.find(NumberofEvents).state('eventCount')).toBe(AppEventCountState);
        AppWrapper.unmount();
    });

    test('Change the "eventCount" state when the inputValue changes', async () => {
        const AppWrapper = mount(<App />);
        const NumberofEventsWrapper = AppWrapper.find(NumberofEvents);
        const inputField = NumberofEventsWrapper.find('input.eventCount-input');
        const eventObject = {target: {value: 20}};
        inputField.simulate('change', eventObject);
        await getEvents();
        expect(AppWrapper.state('eventCount')).toBe(20);
        expect(NumberofEventsWrapper.state('eventCount')).toBe(20);
        AppWrapper.unmount();
    });

    test('Number of events rendered matches inputValue', async () => {
        const AppWrapper = mount(<App />);
        const NumberofEventsWrapper = AppWrapper.find(NumberofEvents);
        const eventObject = {target: {value: 1}};
        await NumberofEventsWrapper.instance().handleInputChanged(eventObject);
        await getEvents();
        expect(AppWrapper.state('events')).toHaveLength(1);
        AppWrapper.unmount();
    });

    test('Content of event rendered matches content of mock API', async () => {
        const AppWrapper = mount(<App />);
        const NumberofEventsWrapper = AppWrapper.find(NumberofEvents);
        const eventObject = {target: {value: 1}};
        await NumberofEventsWrapper.instance().handleInputChanged(eventObject);
        await getEvents();
        expect(AppWrapper.state('events')).toEqual([mockData[0]]);
        AppWrapper.unmount();
    });
})