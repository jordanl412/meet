import React, { Component } from 'react';

class NumberofEvents extends Component {
    state = { eventCount: 32 }

    changeEventCount(value) {
        this.setState({ eventCount: value })
    }

    render() {
        const { eventCount } = this.state;

        return(
            <div className='NumberofEvents'>
                <h3>Number of events shown:</h3>
                <input
                    className='eventCount-input'
                    type='number'
                    value={eventCount}
                    onChange={event => {
                        this.changeEventCount(event.target.value);
                    }}
                >
                </input>
            </div>
        )
    };
};

export default NumberofEvents;