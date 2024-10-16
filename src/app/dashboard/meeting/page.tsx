"use client";
import React, { useState, useEffect } from "react";

interface Event {
  id: string;
  summary: string;
}

interface ApiResponse {
  items: Event[];
}

const Page: React.FC<{ session: unknown }> = ({ session }) => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/calendar/events");
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const data: ApiResponse = await response.json();
        setEvents(data.items || []);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    if (session) {
      void fetchEvents();
    }
  }, [session]);

  if (!session) return <p>Please sign in to view your calendar events.</p>;

  return (
    <div>
      <h1>Google Calendar Events</h1>
      <ul>
        {events.map((event) => (
          <li key={event.id}>{event.summary}</li>
        ))}
      </ul>
    </div>
  );
};

export default Page;
