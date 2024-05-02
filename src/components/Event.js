import { useState } from 'react';

const Event = ({event}) => {
    const [showDetails, setShowDetails] = useState(false);
    const startTime = new Date(event.start.dateTime).toLocaleString();
    return ( 
        <li className="event">
            <h3>{event.summary}</h3>
            <p>{event.location}</p>
            <p data-testid="start-time">{startTime}</p>
            {showDetails ? 
            <p className="details">{event.description}</p> : null }
            <button className="details-btn" onClick={() => setShowDetails(!showDetails)}>
                {showDetails ? "hide details" : "show details"}</button>
        </li>
    );
}

export default Event;