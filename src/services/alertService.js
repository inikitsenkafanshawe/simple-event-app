import { Alert } from "react-native";

// Function to show an error alert
export const showErrorAlert = (errorMessage) => {
  Alert.alert("Error", errorMessage, [{ text: "OK" }], { cancelable: false });
};

// Function to show a confirmation alert before deleting an event
export const showConfirmationAlert = (message, onConfirm) => {
  Alert.alert(
    "Confirm Deletion",
    message,
    [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: onConfirm,
      },
    ],
    { cancelable: false }
  );
};
