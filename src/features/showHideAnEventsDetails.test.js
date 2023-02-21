import { mount } from 'enzyme';
import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import App from '../App';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {
    let AppWrapper;
    test('An event element is collapsed by default', ({ given, when, then }) => {
        given('an event has loaded in the app', () => {
            AppWrapper = mount(<App />);
        });

        when('the user first sees the event', () => {
            
        });

        then('the event\'s details will not be visible to the user.', () => {
            AppWrapper.update();
            expect(AppWrapper.find('.event .expanded')).toHaveLength(0);
        });
    });

    test('User can expand an event to see its details.', ({ given, when, then }) => {
        given('an event has loaded in the app', () => {
            AppWrapper.mount(<App />);
        });

        when('the user clicks on the event', () => {
            AppWrapper.update();
            AppWrapper.find('.event .details-button').at(0).simulate('click');
        });

        then('the event\'s details will become visible.', () => {
            expect(AppWrapper.find('.event .details')).toHaveLength(1);
        });
    });

    test('User can collapse an event to hide its details.', ({ given, when, then }) => {
        given('an event\'s details are already visible', async () => {
            AppWrapper = await mount(<App />);
        });

        when('the user clicks the hide button', () => {
            AppWrapper.update();
            AppWrapper.find('.event .details-button').at(0).simulate('click');
        });

        then('the event\'s details will become hidden.', () => {
            expect(AppWrapper.find('.event .expanded')).toHaveLength(0);
        });
    });
});