import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { TouchableOpacity } from "react-native";
import { logoutUser } from "../services/authService";
import EventsNavigator from "./EventsNavigator";
import FavoritesNavigator from "./FavoritesNavigator";

const BottomTab = createBottomTabNavigator();

const AppNavigator = () => {
  const handleLogout = async () => {
    try {
      // Calls the logoutUser function from authService
      await logoutUser();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <BottomTab.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,
        headerStyle: {
          backgroundColor: "#6A4CFF",
        },
        headerTintColor: "#FFFFFF",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerTitleAlign: "center",
        headerRight: () => (
          <TouchableOpacity onPress={handleLogout} style={{ marginRight: 15 }}>
            <FontAwesome5 name="sign-out-alt" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        ),
        tabBarActiveTintColor: "#FFFFFF",
        tabBarInactiveTintColor: "#D1CFFF",
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "EventsStack") {
            iconName = "list-ul";
          } else if (route.name === "FavoritesStack") {
            iconName = "grin-stars";
          }

          return <FontAwesome5 name={iconName} size={size} color={color} />;
        },
      })}
    >
      <BottomTab.Screen
        name="EventsStack"
        component={EventsNavigator}
        options={{
          title: "Events",
          tabBarStyle: {
            backgroundColor: "#6A4CFF",
            borderTopWidth: 0,
            display: "flex",
          },
        }}
      />
      <BottomTab.Screen
        name="FavoritesStack"
        component={FavoritesNavigator}
        options={{
          title: "Favorites",
          tabBarStyle: {
            backgroundColor: "#6A4CFF",
            borderTopWidth: 0,
            display: "flex",
          },
        }}
      />
    </BottomTab.Navigator>
  );
};

export default AppNavigator;
