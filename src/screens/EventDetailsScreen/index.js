import React, { useContext } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {
  showErrorAlert,
  showConfirmationAlert,
} from "../../services/alertService";
import styles from "./styles";
import { EventsContext } from "../../context/EventsContext";
import { UsersContext } from "../../context/UsersContext";
import { UserContext } from "../../context/UserContext";
import { getCategoryIcon } from "../../constants/categories";

const EventDetailsScreen = ({ route, navigation }) => {
  const { eventId } = route.params;
  const { getEventById, toggleFavorite, deleteEvent } =
    useContext(EventsContext);
  const { getUserById } = useContext(UsersContext);
  const { currentUser } = useContext(UserContext);
  const event = getEventById(eventId);
  const isFavourited = event?.favorites?.includes(currentUser?.uid);

  useFocusEffect(() => {
    const parent = navigation.getParent();
    parent?.setOptions({ headerShown: false }); // Hide BottomTab header
    // Hide BottomTab bar
    parent?.setOptions({
      tabBarStyle: { display: "none" },
    });
  });

  if (!event) return <Text style={styles.error}>Event not found</Text>;

  const creator = event ? getUserById(event.createdBy) : null;
  const isOwner = currentUser.uid === event?.createdBy;
  const categoryIcon = getCategoryIcon(event.category);
  const favouriteCount = event.favorites?.length || 0;

  const handleToggleFavorite = async () => {
    if (isFavourited) {
      showConfirmationAlert(
        "Are you sure you want to delete this event from your favorites?",
        async () => {
          // If user confirms
          try {
            // Remove from favorites toggleFavorite
            await toggleFavorite(eventId);
          } catch (error) {
            // Show error message if removing fails
            showErrorAlert(error.message);
          }
        }
      );
    } else {
      // Directly toggle favorite (no confirmation needed for adding)
      try {
        // Add to favorites toggleFavorite
        await toggleFavorite(eventId);
      } catch (error) {
        // Show error message if adding fails
        showErrorAlert(error.message);
      }
    }
  };

  const handleDelete = async () => {
    showConfirmationAlert(
      "Are you sure you want to delete this event?",
      async () => {
        // If user confirms
        try {
          // Delete event using deleteEvent
          await deleteEvent(eventId);
          // Navigate back after event deletion
          navigation.goBack();
        } catch (error) {
          // Show error message if deletion fails
          showErrorAlert(error.message);
        }
      }
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.detailsHeader}>
        <FontAwesome5 name={categoryIcon} size={32} color="#6A4CFF" />
        <Text style={styles.eventTitle}>{event.name}</Text>
        <TouchableOpacity onPress={handleToggleFavorite}>
          <FontAwesome
            name={isFavourited ? "star" : "star-o"}
            size={25}
            color={isFavourited ? "#FFD700" : "#888"}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.infoRow}>
        <FontAwesome5 name="map-marker-alt" size={16} color="#888" />
        <Text style={styles.infoText}>{event.location}</Text>
      </View>

      <View style={styles.infoRow}>
        <FontAwesome5 name="calendar" size={16} color="#888" />
        <Text style={styles.infoText}>{event.date}</Text>
      </View>

      <Text style={styles.sectionLabel}>Description:</Text>
      <Text style={styles.descriptionText}>{event.description}</Text>

      <Text style={styles.sectionLabel}>Created by:</Text>
      <Text style={styles.descriptionText}>
        {creator.name} ({creator.email})
      </Text>

      <Text style={styles.sectionLabel}>Favourites:</Text>
      <Text style={styles.descriptionText}>
        {favouriteCount === 0
          ? "No one has added this event to their favourites yet."
          : `${favouriteCount} ${
              favouriteCount === 1 ? "person" : "people"
            } has added this event to their favourites.`}
      </Text>

      {isOwner && (
        <View style={styles.ownerActions}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() =>
              navigation.navigate("EditEvent", { eventId: event.id })
            }
          >
            <FontAwesome5 name="edit" size={16} color="#fff" />
            <Text style={styles.iconButtonText}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.iconButton, { backgroundColor: "#FF4D4D" }]}
            onPress={handleDelete}
          >
            <FontAwesome5 name="trash" size={16} color="#fff" />
            <Text style={styles.iconButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

export default EventDetailsScreen;
