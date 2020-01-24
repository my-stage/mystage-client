import React, { useState, useEffect } from 'react';
import {Api, Event, User} from '../api';
import EventListItem from "../components/EventListItem";

function Events() {

  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    //Api.getEvents().then(setEvents);
  }, []);


  return (
      <>
        <h1>Events</h1>
        {events.map((event: Event) => (
            <EventListItem event={event} />
        ))}
      </>
  );
}

export default Events;
