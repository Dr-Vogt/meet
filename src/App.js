import { useEffect, useState } from 'react';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import CityEventsChart from './components/CityEventsChart';
import EventGenresChart from './components/EventGenresChart';
import { extractLocations, getEvents } from './api';
import './App.css';
import { InfoAlert, ErrorAlert, WarningAlert } from './components/Alert';

const App = () => {
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState("see all cities");
  const [infoAlert, setInfoAlert] = useState("");
  const [errorAlert, setErrorAlert] = useState("");
  const [warningAlert, setWarningAlert] = useState("");

  const fetchData = async () => {
    const allEvents = await getEvents();
    const filteredEvents = currentCity === "see all cities" ? 
    allEvents :
    allEvents.filter(event => event.location === currentCity)
    setEvents(filteredEvents.slice(0, currentNOE));
    setAllLocations(extractLocations(allEvents));
  }

  useEffect(() => {
    if (navigator.onLine) {
      setWarningAlert("")
   } else {
     setWarningAlert("Offline App")
   }
    fetchData();
  }, [currentCity, currentNOE]);

  return (
    <div className="App">
      <div className="alerts-container">
        {infoAlert.length ? <InfoAlert text={infoAlert}/> : null}
        {errorAlert.length ? <ErrorAlert text={errorAlert}/> : null}
        {warningAlert.length ? <WarningAlert text={warningAlert} /> : null}
      </div>
      <CitySearch allLocations={allLocations} setCurrentCity={setCurrentCity} setInfoAlert={setInfoAlert} setErrorAlert={setErrorAlert}/>
      <NumberOfEvents setCurrentNOE={setCurrentNOE} setErrorAlert={setErrorAlert} />
      <div className='charts-container'>
      <CityEventsChart allLocations={allLocations} events={events} />
      <EventGenresChart events={events} />
      </div>
      <EventList events={events} />
    </div>
  );
}

export default App;
