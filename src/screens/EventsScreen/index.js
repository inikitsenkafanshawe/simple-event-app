import React, { useContext, useState } from "react";
import {
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "./styles";
import { useFocusEffect } from "@react-navigation/native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { getCategoryIcon } from "../../constants/categories";
import { EventsContext } from "../../context/EventsContext";

const EventsScreen = ({ navigation }) => {
  const { events } = useContext(EventsContext);
  const [search, setSearch] = useState("");

  useFocusEffect(() => {
    const parent = navigation.getParent();
    parent?.setOptions({ headerShown: true }); // Show Drawer header
    // Show BottomTab bar
    parent?.setOptions({
      tabBarStyle: {
        backgroundColor: "#6A4CFF",
        borderTopWidth: 0,
        display: "flex",
      },
    });
  });

  const filteredEvents = events.filter((event) =>
    event.name.toLowerCase().includes(search.toLowerCase())
  );

  const renderEventItem = (item) => {
    const categoryIcon = getCategoryIcon(item.category);

    return (
      <TouchableOpacity
        style={styles.eventCard}
        onPress={() =>
          navigation.navigate("EventDetails", { eventId: item.id })
        }
      >
        <View style={styles.iconContainer}>
          <FontAwesome5 name={categoryIcon} size={25} color="#6A4CFF" />
        </View>

        <View style={styles.cardContent}>
          <Text style={styles.eventTitle}>{item.name}</Text>

          <View style={styles.infoRow}>
            <FontAwesome5
              name="map-marker-alt"
              size={14}
              color="#888"
              style={styles.infoIcon}
            />
            <Text style={styles.infoText}>{item.location}</Text>
          </View>

          <View style={styles.infoRow}>
            <FontAwesome5
              name="calendar"
              size={14}
              color="#888"
              style={styles.infoIcon}
            />
            <Text style={styles.infoText}>{item.date}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={
          events && events.length > 0 ? (
            <TextInput
              style={styles.searchBar}
              placeholder="Search by name..."
              placeholderTextColor={styles.placeholder.color}
              value={search}
              onChangeText={setSearch}
            />
          ) : null
        }
        data={filteredEvents}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => renderEventItem(item)}
        ListEmptyComponent={<Text style={styles.error}>Events not found</Text>}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("NewEvent")}
      >
        <FontAwesome5 name="plus" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default EventsScreen;
