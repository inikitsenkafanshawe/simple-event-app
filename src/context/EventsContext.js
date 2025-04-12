import React, { createContext, useState, useEffect, useContext } from "react";
import { UserContext } from "./UserContext";
import {
  fetchEventsFromDatabase,
  saveEventToDatabase,
  editEventInDatabase,
  toggleFavoriteForUser,
  deleteEventFromDatabase,
} from "../services/dbService";

// Create a context for events
export const EventsContext = createContext();

// Create a provider component for events
export const EventsProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [favoriteEvents, setFavoriteEvents] = useState([]);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    // Check if user is authenticated
    if (currentUser) {
      // Call fetchEventsFromDatabase to start listening for changes
      const unsubscribeEvents = fetchEventsFromDatabase(setEvents);

      // Cleanup listener when currentUser changes or component unmounts
      return () => {
        unsubscribeEvents(); // Unsubscribe from the previous listener
      };
    } else {
      // Clear events if no currentUser
      setEvents([]);
    }
  }, [currentUser]); // Run the effect when currentUser changes

  useEffect(() => {
    // Filter favorite events whenever the events list or currentUser changes
    if (currentUser) {
      const favorites = events.filter(
        (event) => event.favorites?.includes(currentUser.uid) // Check if user ID is in favorites array
      );
      setFavoriteEvents(favorites); // Set the filtered favorite events
    }
  }, [events, currentUser]); // Runs whenever events or currentUser changes

  // Function to get an event by ID
  const getEventById = (eventId) => {
    return events.find((event) => event.id === eventId) || null;
  };

  // Function to save event data to the Firestore
  const saveEvent = async (name, date, location, category, description) => {
    try {
      await saveEventToDatabase(
        name,
        date,
        location,
        category,
        description,
        currentUser.uid
      );
    } catch (error) {
      console.error("Error saving event: ", error);
      throw error;
    }
  };

  // Function to update event data in the Firestore
  const updateEvent = async (
    id,
    name,
    date,
    location,
    category,
    description
  ) => {
    try {
      await editEventInDatabase(
        id,
        name,
        date,
        location,
        category,
        description
      );
    } catch (error) {
      console.error("Error updating event: ", error);
      throw error;
    }
  };

  // Function to delete event data from the Firestore
  const toggleFavorite = async (eventId) => {
    try {
      await toggleFavoriteForUser(eventId, currentUser.uid);
    } catch (error) {
      console.error("Error toggling favorite: ", error);
      throw error;
    }
  };

  // Function to delete event data from the Firestore
  const deleteEvent = async (eventId) => {
    try {
      await deleteEventFromDatabase(eventId);
    } catch (error) {
      console.error("Error deleting event: ", error);
      throw error;
    }
  };

  return (
    <EventsContext.Provider
      value={{
        events,
        favoriteEvents,
        getEventById,
        saveEvent,
        updateEvent,
        toggleFavorite,
        deleteEvent,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
};
