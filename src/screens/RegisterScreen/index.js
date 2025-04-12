import React, { useContext, useState } from "react";
import {
  ScrollView,
  TextInput,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { registerUser } from "../../services/authService";
import { isEmpty } from "../../services/validationService";
import { showErrorAlert } from "../../services/alertService";
import styles from "./styles";
import { UsersContext } from "../../context/UsersContext";

const RegisterScreen = ({ navigation }) => {
  const { saveUser } = useContext(UsersContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nameError, setNameError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const handleRegister = async () => {
    // Reset errors before checking
    setEmailError("");
    setPasswordError("");
    setNameError("");
    // Show the loading state
    setIsLoading(true);

    // Validate that all fields are filled
    if (isEmpty(name)) setNameError("Name is required!");
    if (isEmpty(email)) setEmailError("Email is required!");
    if (isEmpty(password)) setPasswordError("Password is required!");

    // Don't proceed if validation fails
    if (isEmpty(name) || isEmpty(email) || isEmpty(password)) {
      // Hide the loading state
      setIsLoading(false);
      return;
    }

    try {
      // Register the user using authService
      const user = await registerUser(email, password, name);

      // Save additional user data to the database using dbService
      await saveUser(user.uid, name, email);
    } catch (error) {
      // Show error message if registration fails
      showErrorAlert(error.message);
    } finally {
      // Hide the loading state
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Register</Text>

        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor={styles.placeholder.color}
          value={name}
          onChangeText={setName}
        />
        {nameError ? <Text style={styles.error}>{nameError}</Text> : null}

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={styles.placeholder.color}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {emailError ? <Text style={styles.error}>{emailError}</Text> : null}

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={styles.placeholder.color}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        {passwordError ? (
          <Text style={styles.error}>{passwordError}</Text>
        ) : null}

        <TouchableOpacity
          style={[styles.button, isLoading && styles.buttonDisabled]}
          onPress={handleRegister}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>Register</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.loginText}>
          Already have an account?{" "}
          <Text
            style={styles.link}
            onPress={() => navigation.navigate("Login")}
          >
            Login here
          </Text>
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
