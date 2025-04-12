import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import EventsScreen from "../screens/EventsScreen";
import NewEventScreen from "../screens/NewEventScreen";
import EventDetailsScreen from "../screens/EventDetailsScreen";
import EditEventScreen from "../screens/EditEventScreen";

const Stack = createStackNavigator();

const EventsNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#6A4CFF",
        },
        headerTintColor: "#FFFFFF",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="Events"
        component={EventsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NewEvent"
        component={NewEventScreen}
        options={{ headerShown: true, title: "New Event" }}
      />
      <Stack.Screen
        name="EventDetails"
        component={EventDetailsScreen}
        options={{ headerShown: true, title: "Event Details" }}
      />
      <Stack.Screen
        name="EditEvent"
        component={EditEventScreen}
        options={{ headerShown: true, title: "Edit Event" }}
      />
    </Stack.Navigator>
  );
};

export default EventsNavigator;
