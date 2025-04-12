import { db } from "../config/firebaseConfig";
import {
  collection,
  doc,
  onSnapshot,
  setDoc,
  addDoc,
  query,
  orderBy,
  updateDoc,
  deleteDoc,
  arrayRemove,
  arrayUnion,
  getDoc,
} from "firebase/firestore";

// Function to fetch all users from Firestore
export const fetchUsersFromDatabase = (setUsers) => {
  const usersRef = collection(db, "users");

  // Set up the real-time listener using onSnapshot
  const unsubscribe = onSnapshot(
    usersRef,
    (snapshot) => {
      if (snapshot.empty) {
        setUsers([]); // If no documents exist, set the users list to an empty array
      } else {
        const usersList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(usersList); // Update the state with the new users data
      }
    },
    (error) => {
      console.error("Error fetching users:", error);
      setUsers([]); // If there’s an error, set users to an empty array
    }
  );

  // Return the unsubscribe function to stop listening
  return unsubscribe;
};

// Function to save user data to Firestore
export const saveUserToDatabase = async (userId, name, email) => {
  try {
    const userRef = doc(db, "users", userId);
    // Save user to Firestore
    await setDoc(userRef, {
      name,
      email,
    });
  } catch (error) {
    throw error;
  }
};

// Function to fetch all events from Firestore
export const fetchEventsFromDatabase = (setEvents) => {
  const eventsRef = collection(db, "events");

  // Apply orderBy to the query
  const eventsQuery = query(eventsRef, orderBy("date"));

  // Set up the real-time listener using onSnapshot
  const unsubscribe = onSnapshot(
    eventsQuery,
    (snapshot) => {
      if (snapshot.empty) {
        setEvents([]); // If no documents exist, set the events list to an empty array
      } else {
        const eventsList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEvents(eventsList); // Update the state with the new events data
      }
    },
    (error) => {
      console.error("Error fetching events:", error);
      setEvents([]); // If there’s an error, set events to an empty array
    }
  );

  // Return the unsubscribe function to stop listening
  return unsubscribe;
};

// Function to save event data to Firestore
export const saveEventToDatabase = async (
  name,
  date,
  location,
  category,
  description,
  createdBy
) => {
  try {
    const eventsRef = collection(db, "events");
    // Save event to Firestore
    await addDoc(eventsRef, {
      name,
      date,
      location,
      category,
      description,
      createdBy,
    });
  } catch (error) {
    throw error;
  }
};

// Function to edit event data in Firestore
export const editEventInDatabase = async (
  id,
  name,
  date,
  location,
  category,
  description
) => {
  try {
    const eventRef = doc(db, "events", id);
    // Update event in Firestore
    await updateDoc(eventRef, {
      name,
      date,
      location,
      category,
      description,
    });
  } catch (error) {
    throw error;
  }
};

// Function to toggle favorite status for a user on an event in Firestore
export const toggleFavoriteForUser = async (eventId, userId) => {
  try {
    const eventRef = doc(db, "events", eventId); // Reference to the specific event document by ID

    // Get the current event document
    const eventDoc = await getDoc(eventRef);

    // Check if the event document exists
    if (eventDoc.exists()) {
      const eventData = eventDoc.data();
      const favorites = eventData.favorites || []; // Default to an empty array if 'favorites' doesn't exist

      // If the user is already in the 'favorites' array, remove them, else add them
      if (favorites.includes(userId)) {
        // User is in the array, so remove them
        await updateDoc(eventRef, {
          favorites: arrayRemove(userId),
        });
      } else {
        // User is not in the array, so add them
        await updateDoc(eventRef, {
          favorites: arrayUnion(userId),
        });
      }
    }
  } catch (error) {
    throw error;
  }
};

// Function to delete an event from Firestore
export const deleteEventFromDatabase = async (id) => {
  try {
    const eventRef = doc(db, "events", id);
    // Delete the event from Firestore
    await deleteDoc(eventRef);
  } catch (error) {
    throw error;
  }
};
