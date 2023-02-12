import React, { Component } from 'react';

class Event extends Component {
    state = { collapsed: true };
    toggleDetails = () => {
        this.setState(prevState => ({
            collapsed: !prevState.collapsed
        }))
    };

    render() {
        const { event } = this.props;
        const { collapsed } = this.state;
        return (
            <div className='event'>
                <h2 className='summary'>
                    {event.summary}
                </h2>
                <p className='start'>
                    {event.start.dateTime}
                </p>
                <p className='location'>
                    {event.location}
                </p>
                <button 
                    className='details-button'
                    onClick={this.toggleDetails}
                >
                    {collapsed ? 'show' : 'hide'} Details
                </button>
                {!collapsed && (
                    <div className='details'>
                        <h3 className='about'>
                            More info:
                        </h3>
                        <a
                            className='event-link'
                            href={event.htmlLink}
                            target='_blank'
                            rel='noopener noreferrer'
                        >
                            View in Google Calendar
                        </a>
                        <p className='description'>
                            {event.description}
                        </p>
                    </div>
                )}
            </div>
        );
    }
}

export default Event;