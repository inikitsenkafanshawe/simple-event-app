import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import FavoritesScreen from "../screens/FavoritesScreen";
import EventDetailsScreen from "../screens/EventDetailsScreen";
import EditEventScreen from "../screens/EditEventScreen";

const Stack = createStackNavigator();

const FavoritesNavigator = () => {
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
        name="Favorites"
        component={FavoritesScreen}
        options={{ headerShown: false }}
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

export default FavoritesNavigator;
