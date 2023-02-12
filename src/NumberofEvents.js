import React, { Component } from 'react';

class NumberofEvents extends Component {
    state = { eventCount: 32 }

    handleInputChanged = (e) => {
        const inputValue = e.target.value;

        if (inputValue < 1) {
            alert('Please select a number from 1 to 32.');
        } else {
            this.props.updateEvents(null, inputValue);
            this.setState({ eventCount: inputValue });
        }
    }

    /*changeEventCount(value) {
        this.setState({ eventCount: value })
    }*/
 
    render() {
        //const { eventCount } = this.state;

        return(
            <div className='NumberofEvents'>
                <h3>Number of events shown:</h3>
                <input
                    className='eventCount-input'
                    type='number'
                    value={this.state.eventCount}
                    onChange={this.handleInputChanged}
                    
                    /*event => {
                        this.changeEventCount(event.target.value);
                    }}*/
                >
                </input>
            </div>
        );
    };
};

export default NumberofEvents;