import React from 'react';
import { shallow } from 'enzyme';
import NumberofEvents from '../NumberofEvents';

describe('<NumberofEvents /> component', () => {
    let NumberofEventsWrapper, eventCountInput;
    beforeAll(() => {
        NumberofEventsWrapper = shallow(<NumberofEvents />);
        eventCountInput = NumberofEventsWrapper.find('input.eventCount-input');
    }); 

    test('NumberofEvents is rendered', () => {
        expect(NumberofEventsWrapper).toBeDefined();
    });

    test('eventCountInput to be rendered', () => {
        expect(eventCountInput).toBeDefined();
    });

    /*test('eventCount-input is 32 by default', () => {
        expect(NumberofEventsWrapper.find('input.eventCount-input').prop('type')).toBe('number');
        expect(NumberofEventsWrapper.state('eventCount')).toBe(32);
    });*/

    test('eventCount-input is changed correctly', () => {
        expect(NumberofEventsWrapper.state('eventCount')).toBe(32);
        NumberofEventsWrapper.find('input.eventCount-input').simulate('change', {
            target: { value: 15 }
        });
        expect(NumberofEventsWrapper.state('eventCount')).toBe(15);
    });
})
