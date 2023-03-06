import React, { Component } from 'react';
import { ErrorAlert } from './Alert';

class NumberofEvents extends Component {
    state = { 
        eventCount: 32,
        errorText: ''
     }

    handleInputChanged = (event) => {
        const inputValue = event.target.value;

        if (inputValue < 1 || inputValue>32) {
            this.setState({
                errorText: 'Select a number from 1 to 32'
            })
        } else {
            this.props.updateEvents(null, inputValue);
            this.setState({ 
                eventCount: inputValue,
            errorText: ''
            });
        }
    }

    /*changeEventCount(value) {
        this.setState({ eventCount: value })
    }*/
 
    render() {
        //const { eventCount } = this.state;

        return(
            <div className='NumberofEvents'>
                <ErrorAlert text={this.state.errorText} />
                <h3>Number of events shown:</h3>
                <input
                    className="eventCount-input"
                    type="number"
                    value={this.state.eventCount}
                    onChange={this.handleInputChanged}
                    
                    /*event => {
                        this.changeEventCount(event.target.value);
                    }}*/
                />
            </div>
        );
    }
}

export default NumberofEvents;