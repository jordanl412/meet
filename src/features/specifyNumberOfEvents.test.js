import { loadFeature, defineFeature } from 'jest-cucumber';
import { mount } from 'enzyme';
import React from 'react';
import App from '../App';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
    let AppWrapper;
    test('When user hasn\'t specified a number, 32 is the number', ({ given, when, then }) => {
        given('the user has not specified a number of events to load', () => {

        });

        when('the user uses the app', () => {
            AppWrapper = mount(<App />);
        });

        then('the number of events shown will be 32.', () => {
            expect(AppWrapper.state('eventCount')).toEqual(32);
        });
    });

    test('User can change the number of events they want to see', ({ given, when, then }) => {
        given('the user has specified the number of events to load', () => {

        });

        when('the user uses the app', async () => {
            AppWrapper = await mount(<App />);
        });

        then('the number of events shown will be the amount selected by the user.', () => {
            AppWrapper.update();
            let NumberofEventsWrapper = AppWrapper.find('NumberofEvents');
            const eventObject = { target: { value: 2 } };
            NumberofEventsWrapper.find('.eventCount-input').simulate(
                'change', 
                eventObject
            );
            expect(AppWrapper.find('.event')).toHaveLength(2);
        });
    });
});