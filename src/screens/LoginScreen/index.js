import React, { useState } from "react";
import {
  ScrollView,
  TextInput,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { loginUser } from "../../services/authService";
import { isEmpty } from "../../services/validationService";
import { showErrorAlert } from "../../services/alertService";
import styles from "./styles";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const handleLogin = async () => {
    // Reset errors before checking
    setEmailError("");
    setPasswordError("");
    // Show the loading state
    setIsLoading(true);

    // Validate that all fields are filled
    if (isEmpty(email)) setEmailError("Email is required!");
    if (isEmpty(password)) setPasswordError("Password is required!");

    // Don't proceed if validation fails
    if (isEmpty(email) || isEmpty(password)) {
      // Hide the loading state
      setIsLoading(false);
      return;
    }

    try {
      // Login the user using authService
      await loginUser(email, password);
    } catch (error) {
      // Show error message if login fails
      showErrorAlert(error.message);
    } finally {
      // Hide the loading state
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Login</Text>

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
          onPress={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.registerText}>
          Don't have an account?{" "}
          <Text
            style={styles.link}
            onPress={() => navigation.navigate("Register")}
          >
            Register here
          </Text>
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;
