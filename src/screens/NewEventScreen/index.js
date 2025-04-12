import React, { useContext, useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import { isEmpty, isValidDateFormat } from "../../services/validationService";
import { showErrorAlert } from "../../services/alertService";
import styles from "./styles";
import { categories } from "../../constants/categories";
import { EventsContext } from "../../context/EventsContext";

const NewEventScreen = ({ navigation }) => {
  const { saveEvent } = useContext(EventsContext);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState();
  const [description, setDescription] = useState("");
  const [nameError, setNameError] = useState("");
  const [dateError, setDateError] = useState("");
  const [locationError, setLocationError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state

  useFocusEffect(() => {
    const parent = navigation.getParent();
    parent?.setOptions({ headerShown: false }); // Hide BottomTab header
    // Hide BottomTab bar
    parent?.setOptions({
      tabBarStyle: { display: "none" },
    });
  });

  const handleCreateEvent = async () => {
    // Reset errors before checking
    setNameError("");
    setDateError("");
    setLocationError("");
    setCategoryError("");
    setDescriptionError("");
    // Show the loading state
    setIsLoading(true);
    // Validate that all fields are filled
    if (isEmpty(name)) setNameError("Event name is required!");
    if (isEmpty(date)) {
      setDateError("Date is required!");
    } else {
      if (!isValidDateFormat(date))
        setDateError("Date must be in YYYY-MM-DD format!");
    }
    if (isEmpty(location)) setLocationError("Location is required!");
    if (isEmpty(category)) setCategoryError("Category is required!");
    if (isEmpty(description)) setDescriptionError("Description is required!");

    // Don't proceed if validation fails
    if (
      isEmpty(name) ||
      !isValidDateFormat(date) ||
      isEmpty(location) ||
      isEmpty(description)
    ) {
      // Hide the loading state
      setIsLoading(false);
      return;
    }

    try {
      // Save event using saveEvent
      await saveEvent(name, date, location, category, description);
      // Navigate back after event creation
      navigation.goBack();
    } catch (error) {
      // Show error message if creation fails
      showErrorAlert(error.message);
    } finally {
      // Hide the loading stater
      setIsLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Event Name"
        placeholderTextColor={styles.placeholder.color}
        value={name}
        onChangeText={setName}
      />
      {nameError ? <Text style={styles.error}>{nameError}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Date (YYYY-MM-DD)"
        placeholderTextColor={styles.placeholder.color}
        value={date}
        onChangeText={setDate}
      />
      {dateError ? <Text style={styles.error}>{dateError}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Location"
        placeholderTextColor={styles.placeholder.color}
        value={location}
        onChangeText={setLocation}
      />
      {locationError ? <Text style={styles.error}>{locationError}</Text> : null}

      <Picker
        selectedValue={category}
        onValueChange={(itemValue) => setCategory(itemValue)}
        style={{ color: category ? "#000" : styles.placeholder.color }}
      >
        <Picker.Item
          label="Select Category"
          value=""
          color={styles.placeholder.color}
        />
        {categories.map((cat) => (
          <Picker.Item key={cat.value} label={cat.label} value={cat.value} />
        ))}
      </Picker>
      {categoryError ? <Text style={styles.error}>{categoryError}</Text> : null}

      <TextInput
        style={[styles.input, { height: 100, textAlignVertical: "top" }]}
        placeholder="Description"
        placeholderTextColor={styles.placeholder.color}
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
      />
      {descriptionError ? (
        <Text style={styles.error}>{descriptionError}</Text>
      ) : null}

      <TouchableOpacity
        style={[styles.button, isLoading && styles.buttonDisabled]}
        onPress={handleCreateEvent}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.buttonText}>Create</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

export default NewEventScreen;
